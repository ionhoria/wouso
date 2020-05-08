const { Router } = require('express')
const shuffle = require('lodash/shuffle')
const moment = require('moment')
const Sequelize = require('sequelize')
const { QotdInstance, QotdQuestion, QotdAnswer } = require('../models')
const { User } = require('../../../models')
const logger = require('../../../loaders/logger')

const route = Router()
route.get('/', async (req, res, next) => {
  try {
    const today = new Date().setHours(0, 0, 0, 0)
    let qotd = await QotdInstance.findByPk(today, {
      attributes: ['day'],
      include: [
        {
          model: QotdQuestion,
          attributes: ['text', 'answers'],
        },
      ],
    })

    // Random qotd generation
    if (!qotd) {
      logger.info('qotd not found. Generating random qotd.')
      /*
       * If no qotd is set, choose random question and generate qotd.
       * This randomly selects a question from the entire question pool.
       * TODO: Consider tags when selecting.
       */
      const random = await QotdQuestion.findAll({
        /*
         * Find all questions which do not already belong to a qotd session
         * (have not been used in the past)
         */
        where: { '$QotdInstance.QotdQuestionId$': null },
        include: {
          model: QotdInstance,
        },
        attributes: ['id'],
      })
      if (random.length === 0) {
        logger.error(
          'Failed generating qotd! There are no suitable questions to choose from.'
        )
        return next({ status: 500 })
      }
      const question = random[Math.floor(Math.random() * random.length)]
      await QotdInstance.create({ day: today, QotdQuestionId: question.id })
      qotd = await QotdInstance.findByPk(today, {
        attributes: ['day'],
        include: {
          model: QotdQuestion,
          attributes: ['text', 'answers'],
        },
      })
    }
    // QoTD might still be null (i.e ACTIVE config flag set to false)
    if (!qotd) return next({ status: 404 })
    const payload = {
      day: qotd.day,
      question: {
        text: qotd.QotdQuestion.text,
      },
    }
    const { valid, invalid } = qotd.QotdQuestion.answers
    payload.question.answers = shuffle(invalid.concat(valid)) // shuffle answers
    const answer = await qotd.getQotdAnswers({
      where: { userId: req.session.user.id },
      attributes: ['answer', 'valid'],
    })
    if (answer.length > 0) payload.answer = answer[0].toJSON()
    res.json(payload)
  } catch (err) {
    next(err)
  }
})

route.post('/', async (req, res, next) => {
  const userId = req.session.user.id
  const { day, answer } = req.body
  const today = new Date().setHours(0, 0, 0, 0)
  if (!answer || new Date(day).setHours(0, 0, 0, 0) !== today) {
    console.log('different')
    return next({ status: 400, message: 'Wrong day' })
  }
  try {
    const qotd = await QotdInstance.findByPk(today, {
      attributes: ['day'],
      include: {
        model: QotdQuestion,
        attributes: ['id', 'text', 'answers'],
      },
    })
    if (!qotd) {
      throw "No qotd found! This is weird... Someone posted an answer for\
      today's qotd without ever fetching (or knowing) today's qotd"
    }
    console.log(userId)
    const valid = answer === qotd.QotdQuestion.answers.valid
    await QotdAnswer.create({
      UserId: userId,
      answer,
      valid,
      QotdInstanceDay: today,
    })
    let scoreDelta = valid ? 100 : 0
    // if (moment.duration(moment().diff(moment(day))).asHours() < DOUBLE_TIME) {
    //   scoreDelta *= 2
    // }
    // await Activity.create({
    //   text: `${valid ? 'Valid' : 'Invalid'} answer for qotd on ${day}`,
    //   scoreDelta,
    //   userId,
    // })
    if (scoreDelta != 0) {
      await User.update(
        { score: Sequelize.literal(`score + ${scoreDelta}`) },
        { where: { id: userId } }
      )
    }
    res.json({ day, valid })
  } catch (err) {
    // User has already answered qotd
    if (err.name === 'SequelizeUniqueConstraintError') {
      return next({ status: 400 })
    }
    next(err)
  }
})

module.exports = route

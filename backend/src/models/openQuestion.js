const Sequelize = require('sequelize')
const db = require('../../db')

const Question = db.define('openQuestions', {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  answer: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Question

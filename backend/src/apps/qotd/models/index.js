const { Sequelize, DataTypes } = require('sequelize')

class QotdQuestion extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        text: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        answers: {
          type: Sequelize.JSON,
          allowNull: false,
        },
      },
      { sequelize }
    )
  }

  static associate(models) {
    this.hasOne(models.QotdInstance)
  }
}

class QotdInstance extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        day: {
          type: Sequelize.DATEONLY,
          primaryKey: true,
        },
      },
      { sequelize }
    )
  }

  static associate(models) {
    this.belongsTo(models.QotdQuestion)
    this.hasMany(models.QotdAnswer)
  }
}

class QotdAnswer extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        answer: {
          type: Sequelize.STRING,
        },
        valid: {
          type: Sequelize.BOOLEAN,
        },
      },
      { sequelize }
    )
  }

  static associate(models) {
    this.belongsTo(models.User)
    this.belongsTo(models.QotdInstance)
  }
}

module.exports = { QotdQuestion, QotdInstance, QotdAnswer }

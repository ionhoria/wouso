const Sequelize = require('sequelize')

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

module.exports = QotdAnswer

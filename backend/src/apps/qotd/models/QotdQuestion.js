const Sequelize = require('sequelize')

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

module.exports = QotdQuestion

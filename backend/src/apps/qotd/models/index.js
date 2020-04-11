const { Sequelize, DataTypes } = require('sequelize')

class Qotd extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        text: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { sequelize }
    )
  }
}

module.exports = { Qotd }

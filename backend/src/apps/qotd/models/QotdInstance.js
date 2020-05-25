const Sequelize = require('sequelize')

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

module.exports = QotdInstance

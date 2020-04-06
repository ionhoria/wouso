const { Sequelize, DataTypes } = require('sequelize')
// const ldap = require('ldapjs')
// const ldapConfig = require('../config').ldap
// const logger = require('../logger')

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        username: {
          type: DataTypes.STRING,
          unique: {
            msg: 'This username is already registered.',
          },
          allowNull: false,
          set(val) {
            this.setDataValue('username', val.toLowerCase().trim())
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        score: {
          type: DataTypes.INTEGER,
          defaultValue: 60,
          allowNull: false,
        },
        elo: {
          type: DataTypes.INTEGER,
          defaultValue: 1000,
          allowNull: false,
        },
        targetGroup: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
      },
      { sequelize }
    )
  }

  static authenticate(username, password) {
    return this.findOne({ where: { username } })
  }
}

// // Perform LDAP authentication
// User.authenticate = (username, password) => {
//   const { url, bindName, bindPass, base, targetGroup } = ldapConfig

//   return new Promise((resolve, reject) => {
//     let user = null
//     const searchOptions = {
//       scope: 'sub',
//       filter: `uid=${username}`,
//       sizeLimit: 1,
//       attributes: ['uid', 'givenName', 'sn', 'mail'],
//     }

//     const adminClient = ldap.createClient({ url })
//     adminClient.on('error', reject)

//     adminClient.bind(bindName, bindPass, (err) => {
//       if (err) {
//         return reject(err)
//       }

//       adminClient.search(base, searchOptions, (err, res) => {
//         if (err) {
//           return reject(err)
//         }

//         res.on('searchEntry', (entry) => {
//           user = entry.object
//         })

//         res.on('error', reject)

//         res.on('end', (result) => {
//           // Reject if LDAP fails to find the supplied username.
//           if (!user || result.status !== 0) {
//             return reject(
//               new Error(
//                 `LDAP login failed. Username "${username}" does not exist.`
//               )
//             )
//           }

//           // Attempt to authenticate user using the supplied password.
//           const userClient = ldap.createClient({ url })
//           userClient.on('error', reject)
//           userClient.bind(user.dn, password, async (err) => {
//             // Reject if the supplied password is incorrect.
//             if (err) {
//               return reject(new Error(`Invalid password for ${username}`))
//             }

//             // LDAP authentication succeeded.
//             // Resolve user data from database (create user if necessary).
//             await User.findOrCreate({
//               where: { username: user.uid },
//               defaults: {
//                 username: user.uid,
//                 email: user.mail,
//                 firstName: user.givenName,
//                 lastName: user.sn,
//                 targetGroup: user.dn.includes(targetGroup),
//               },
//             })
//               .spread((user, created) => {
//                 if (created) logger.info(`Created user ${user.username}`)
//                 resolve(user)
//               })
//               .catch(reject)

//             // Close user LDAP connection and cleanup
//             userClient.unbind()
//             userClient.destroy()
//           })

//           // Close admin LDAP connection and cleanup
//           adminClient.unbind()
//           adminClient.destroy()
//         })
//       })
//     })
//   })

module.exports = User

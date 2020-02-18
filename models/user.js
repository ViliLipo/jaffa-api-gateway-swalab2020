const Sequelize = require('sequelize');
const database = require('./database.js');


const { Model } = Sequelize;


class User extends Model {
  getSimpleRepresentation() {
    const { id, username } = this;
    return { id, username };
  }

  getJsonRepresentation() {
    return JSON.stringify(this.getSimpleRepresentation());
  }
}

User.init({
  passwordHash: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize: database,
  modelName: 'user',
});

User.sync({ force: true });

module.exports = User;

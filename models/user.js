const Sequelize = require('sequelize');
const { hash } = require('bcrypt');
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
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  sequelize: database,
  modelName: 'user',
});

User.sync({ force: true }).then(async () => {
  const hashstr = await hash('password', 10);
  User.create({ username: 'Testman', passwordHash: hashstr });
  User.create({ username: 'Mutedman', passwordHash: hashstr });
});

module.exports = User;

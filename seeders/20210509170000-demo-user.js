
const faker = require('faker');
const bcrypt = require('bcryptjs');
const GENDER = ['male','female'];
const PASSWORD =  bcrypt.hashSync('password', 8);
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let seedUser = []
    for(let i = 0 ; i < 10 ; i++){
      seedUser.push({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: PASSWORD,
        gender:GENDER[Math.floor(Math.random())],
        dob:new Date(1995,06,16),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Users', seedUser);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};

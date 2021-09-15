'use strict'
module.exports =  {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    queryInterface.addIndex('Likes', ['postID', 'userId]'], {
      unique: true
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Likes')
  }
}
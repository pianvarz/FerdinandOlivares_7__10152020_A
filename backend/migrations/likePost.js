'user strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        queryInterface.addColumn('Posts', 'likesCount', {
            types: Sequelize.INTEGER
        })
    }, 
    down: async (queryInterface, Sequelize) => {
        queryInterface.removeColumn('Posts', 'likesCount', {
            types: Sequelize.STRING
        })
    }
}
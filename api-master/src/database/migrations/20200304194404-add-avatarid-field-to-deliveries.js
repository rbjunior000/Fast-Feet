module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'deliveries',
      'avatar_id',
      {
      type: Sequelize.INTEGER,
      references: { model: 'files', key: 'id' },
      allowNull: true,
     }
    );

  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'deliveries',
      'avatar_id'
    );
  }
}

exports.up = function(knex, Promise) {
  return knex.schema.alterTable('milestones', table => {
      table.integer('famous_person_id').unsigned()
      table.foreign('famous_person_id').references('milestones.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('milestones', table => {
      table.dropColumn('famous_person_id')
    })
};

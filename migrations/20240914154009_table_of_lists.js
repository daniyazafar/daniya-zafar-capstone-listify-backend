export function up(knex) {
    return knex.schema.createTable('lists', (table)=> {
        table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
        table.string('name').notNullable();
        table.string('type').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('modified_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    });
};


export function down(knex) {
    return knex.schema.dropTable('lists');
};

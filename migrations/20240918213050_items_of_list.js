export function up(knex) {
    return knex.schema.createTable("items_of_list", (table) => {
        table.increments("id").primary();
        table
            .integer("list_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("lists")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        table.string("item").notNullable();
        table.string("category");
        table.boolean("is_checked").notNullable().defaultTo(false);
    });
}

export function down(knex) {
    return knex.schema.dropTable("items_of_list");
}

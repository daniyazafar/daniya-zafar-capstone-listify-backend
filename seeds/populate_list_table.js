export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('lists').del()
  await knex('lists').insert([
    { id: knex.raw('UUID()'), name: 'Grocery', type: 'Grocery', },
    { id: knex.raw('UUID()'), name: 'Bedtime Routine', type: 'Routine', },
    { id: knex.raw('UUID()'), name: 'Morning Routine', type: 'Routine', },
  ]);
};

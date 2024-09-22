export async function seed(knex) {
  await knex('lists').del()
  await knex('lists').insert([
    { name: 'Grocery', type: 'Grocery', },
    { name: 'Bedtime Routine', type: 'Routine', },
    { name: 'Morning Routine', type: 'Routine', },
  ]);
};

import knex from '../knex.js';

const getAllLists = async (_req, res) => {
    try {
        const lists = await knex('lists').select('*');
        res.status(200).json(lists);
    } catch (error) {
        console.error("Error getting All lists", error);
        res.status(500).json({ error: 'Failed to get All Lists'})
    }
};

export { getAllLists };
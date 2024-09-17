import knex from '../knex.js';

const getAllLists = async (_req, res) => {
    try {
        const lists = await knex('lists').select('*');
        res.status(200).json(lists);
    } catch (error) {
        console.error("Error getting All lists", error);
        res.status(500).json({ error: "Failed to get All Lists"});
    }
};

const postNewList = async (req, res) => {
    try {
        const {name, type} = req.body;
        await knex('lists').insert({name, type});
        res.status(201).json({ message: "List added successfully"})
    } catch (error) {
        res.status(500).json({ error: "Failed to create new list"});
    }
};

const getListById = async (req, res) => {
    try {
        const { id } = req.params;
        const listById = await knex('lists').where({ id }).first();
        if (!listById) {
            return res.status(404).json({ error: 'List not found' });
        }
        res.status(200).json(listById);
    } catch (error) {
        res.status(500).json({ error: "Failed to get list: "});
    }
};

export { getAllLists, getListById, postNewList };
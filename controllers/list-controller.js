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
}

export { getAllLists, postNewList };
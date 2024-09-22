import knex from '../db/knex.js';
import { categorizeItems } from '../openAiApi.js';

const getAllLists = async (_req, res) => {
    try {
        const lists = await knex('lists').select('*');
        res.status(200).json(lists);
    } catch (error) {
        console.error("Error getting All lists", error);
        res.status(500).json({ error: "Failed to get All Lists" });
    }
};

const postNewList = async (req, res) => {
    try {
        const {name, type} = req.body;
        const [listId] = await knex('lists').insert({name, type});
        res.status(201).json({ message: "List added successfully", listId })
    } catch (error) {
        console.error('Error while creating list and table:', error); 
        res.status(500).json({ error: "Failed to create new list" });
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
        console.log("Failed to get list by id", error);
        res.status(500).json({ error: "Failed to get list by id" });
    }
};

const deleteListById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await knex('lists').where({ id }).delete();
        if (response) {
            res.status(200).json({ message: "List deleted successfully" });
        } else {
            res.status(404).json({ message: "List not found" });
        }
    } catch (error) {
        console.error("Failed to delete list", error)
        res.status(500).json({ message: "An error occurred while deleting the list" });
    }
}

const postItems = async (req, res) => {
    try {
        const { items } = req.body;
        const { id } = req.params;
        
        const currentItems = await knex('items_of_list')
            .where({ list_id: id })
            .pluck('item');

        const newItems = items
            .filter(item => item.trim() !== '')
            .filter(item => !currentItems.includes(item));
            const itemsToDelete = currentItems.filter(item => !items.includes(item));
            if (itemsToDelete.length > 0) {
                await knex('items_of_list')
                    .where({ list_id: id })
                    .whereIn('item', itemsToDelete)
                    .del();
            }
        if (newItems.length > 0) {
            const formattedItems = newItems.map(item => ({
                item,
                list_id: id
            }));
            await knex('items_of_list').insert(formattedItems);
        }
        res.status(201).json({ message: `${newItems.length} new items added to list with id ${id}` });
    } catch (error) {
        console.log("Failed to add items to the list", error);
        res.status(500).json({ error: 'Failed to add items to the list', error });
    }

};

const getItemsbyListId = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await knex('items_of_list').where({ list_id: id });
        res.status(200).json(response);
    } catch (error) {
        console.log("Failed to get items of list", error);
        res.status(500).json({ error: 'Failed to get items of list', error });
    }
};

const updateItemCheckmark = async (req, res) => {
    try {
        const { id, itemId } = req.params;
        const { is_checked } = req.body;
        
        await knex('items_of_list')
            .where({ list_id: id, id: itemId })
            .update({ is_checked });
        
        res.status(200).json({ message: 'Checkmark updated' });
    } catch (error) {
        console.log("Failed to update chekmark", error);
        res.status(500).json({ error: 'Failed to update checkmark', error });
    }

};

const categorizeListItems = async (req, res) => {
    try {
        const { id } = req.params;
        const items = await knex("items_of_list").where({ list_id: id });
        const item = items.map(item => item.item);
        const categorizedItems = await categorizeItems(item);
        res.status(200).json(JSON.parse(categorizedItems));
        return item;
    } catch (error) {
        console.log("Failed to get item by ID", error);
        res.status(500).json({ message: "An error occurred while trying to categorize list items" });
    }
}

export { getAllLists, getListById, postNewList, deleteListById, postItems, getItemsbyListId, updateItemCheckmark, categorizeListItems};
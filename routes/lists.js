import express from 'express';
import * as listController from '../controllers/list-controller.js';

const router = express.Router();

router
    .get('/', listController.getAllLists)
    .post('/', listController.postNewList)
    
    .get('/:id', listController.getListById)
    .post('/:id/items', listController.postItems)

    .get('/:id/items', listController.getItemsbyListId)
    .get('/:id/items/categorized', listController.categorizeListItems)
    .put('/:id/items/:itemId/checkmark', listController.updateItemCheckmark);

export default router;

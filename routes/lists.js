import express from 'express';
import * as listController from '../controllers/list-controller.js';

const router = express.Router();

router
    .get('/', listController.getAllLists)
    .get('/:id', listController.getListById)
    .post('/', listController.postNewList)

export default router;

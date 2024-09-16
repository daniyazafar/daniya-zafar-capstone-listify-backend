import express from 'express';
import * as listController from '../controllers/list-controller.js';

const router = express.Router();

router
    .get('/', listController.getAllLists)
    .post('/', listController.postNewList)

export default router;

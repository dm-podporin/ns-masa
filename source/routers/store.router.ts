import express from 'express';
import controller from '../controllers/store.controller'

const router = express.Router();

router.get('/storeIdDemo', controller.getStoreId)
router.get('/storeId', controller.getStoreId)

export = router;
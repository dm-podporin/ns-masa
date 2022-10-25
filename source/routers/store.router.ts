import express from 'express';
import controller from '../controllers/store.controller'

const router = express.Router();

router.get('/stores', controller.getStores)
router.get('/storeById/:store_id', controller.getStoreById)

export = router;
import {Request, Response, NextFunction} from 'express';
import { StoreService } from '../services/store.service';

const storeService: StoreService = new StoreService();

const getStoreId = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: storeService.getStoreId ()
    });
};

export default {getStoreId}
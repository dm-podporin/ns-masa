import {Request, Response, NextFunction} from 'express';
import { StoreService } from '../services/store.service';
import { storeId, systemError } from '../entities';
import { ErrorCodes } from '../constants';

const storeService: StoreService = new StoreService();

const getStoreId = async (req: Request, res: Response, next: NextFunction) => {
    storeService.getStoreId()
        .then((result: storeId[])=> {
            return res.status(200).json({
                message: result
            });
        })
        .catch((error: systemError) => {
            switch(error.code) {
                case ErrorCodes.ConnectionError:
                    return res.status(408).json({
                        errorMessage: error.message
                    });
                default:
                    return res.status(400).json({
                        errorMessage: error.message
                    });
            }
    })
};

export default {getStoreId}
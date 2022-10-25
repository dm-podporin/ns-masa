import {Request, Response, NextFunction} from 'express';
import { StoreService } from '../services/store.service';
import { stores as store, systemError } from '../entities';
import { ErrorCodes } from '../constants';

const storeService: StoreService = new StoreService();

const getStores = async (req: Request, res: Response, next: NextFunction) => {
    storeService.getStoresI()
        .then((result: store[])=> {
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
                case ErrorCodes.QueryError:
                    return res.status(406).json({
                        errorMessage: error.message
                    });                
                default:
                    return res.status(400).json({
                        errorMessage: error.message
                    });
            }
    })
};

const getStoreById = async (req: Request, res: Response, next: NextFunction) => {
    let store_id: number = -1;

    const sId: string = req.params.store_id;
    if (isNaN(Number(sId))) {
        return res.status(500).json
    }

    if (sId !== null && sId !== undefined) {
        store_id = parseInt(sId);
    }
    else {
        return res.status(300).json
    }

    if (store_id > 0) {
        storeService.getStoreByIdI(store_id)
            .then((result: store) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                switch (error.code) {
                    case ErrorCodes.ConnectionError:
                        return res.status(408).json({
                            errorMessage: error.message
                        });
                    case ErrorCodes.QueryError:
                        return res.status(406).json({
                            errorMessage: error.message
                        });
                    default:
                        return res.status(400).json({
                            errorMessage: error.message
                        });
                }
            });
    }
    else {
        return res.status(501).json
    }
};

export default {getStores, getStoreById}
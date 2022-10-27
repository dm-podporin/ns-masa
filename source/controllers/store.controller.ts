import {Request, Response, NextFunction} from 'express';
import { StoreService } from '../services/store.service';
import { store, systemError } from '../entities';
import { ErrorCodes, ErrorMessages } from '../constants';
import { ResponseHelper } from '../helpers/response.helpers';
import { ErrorHelper } from '../helpers/error.helpers';
import { RequestHelper } from '../helpers/request.helpers';

const storeService: StoreService = new StoreService();

const getStores = async (req: Request, res: Response, next: NextFunction) => {
    storeService.getStoresI()
        .then((result: store[])=> {
            return res.status(200).json({
                message: result
            });
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
    })
};

const getStoreById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.store_id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            storeService.getStoreByIdI(numericParamOrError)
                .then((result: store) => {
                    return res.status(200).json(result);
                })
                .catch((error: systemError) => {
                    return ResponseHelper.handleError(res, error);
                });
        }
        else {
            // TODO: Error handling
        }
    }
    else {
        return ResponseHelper.handleError(res, numericParamOrError);
    }
};

const updateStoreById = async (req: Request, res: Response, next: NextFunction) => {

    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(req.params.store_id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: store = req.body;

            storeService.updateStoreByIdI({
                store_id: numericParamOrError,
                store_name: body.store_name,
                city: body.city
            })
                .then(() => {
                    return res.sendStatus(200);
                })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
        }
        else {
            // TODO: Error handling
        }
    }
    else {
            return ResponseHelper.handleError(res, numericParamOrError);
    }
};

    const getStoreByCity = async (req: Request, res: Response, next: NextFunction) => {
        let city: string = req.params.city;
    
        storeService.getStoreByCityI(city)
            .then((result: store[]) => {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
};

export default {getStores, getStoreById,getStoreByCity,updateStoreById}
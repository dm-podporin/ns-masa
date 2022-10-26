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

const updateStoreById = async (req: Request, res: Response, next: NextFunction) => {let store_id: number = -1;

    const sId: string = req.params.store_id;
    if (isNaN(Number(sId))) {
        const nonNumericError: systemError = ErrorHelper.createError(ErrorCodes.NonNumericInput, ErrorMessages.NonNumericInput);
        return ResponseHelper.handleError(res, nonNumericError);
    }

    if (sId !== null && sId !== undefined) {
        store_id = parseInt(sId);
    }
    else {
        const noInputParameteterError: systemError = ErrorHelper.createError(ErrorCodes.InputParameterNotSupplied, ErrorMessages.InputParameterNotSupplied);
        return ResponseHelper.handleError(res, noInputParameteterError);
    }

    if (store_id > 0) {
        storeService.getStoreByIdI(store_id)
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
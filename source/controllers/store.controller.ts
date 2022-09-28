import {Request, Response, NextFunction} from 'express';
import { SchoolService } from '../services/store.service';

const schoolService: SchoolService = new SchoolService();

const getStoreId = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: schoolService.getStoreId
    });
};

export default {getStoreId}
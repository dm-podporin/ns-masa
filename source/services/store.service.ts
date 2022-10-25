import { SqlClient, Error, Connection } from "msnodesqlv8";
import { stores as store, systemError } from '../entities';
import { DB_CONNECTION_STRING, ErrorCodes, ErrorMessages, Queries } from "../constants";
import { ErrorHelper } from "../helpers/error.helpers";

interface localSroreId {
    store_id: number;
    store_name: string;
    city: string;
    foundation_date: string;
    create_date: Date;
    update_date: Date;
    create_user_id: string;
    update_user_id: string;
    status_id: string;
}

interface IStoreService {

    getStoresI(): Promise<store[]>;
    getStoreByIdI(id: number): Promise<store>;
}

export class StoreService implements IStoreService {

    public getStoresI(): Promise<store[]> {
        
        return new Promise<store[]> ((resolve, reject) => {
            const result: store[]=[]
            const sql: SqlClient = require("msnodesqlv8");

            const connectionString: string = DB_CONNECTION_STRING;
            const query: string = Queries.Stores;
        
            sql.open(connectionString, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    const error: systemError = {
                        code: ErrorCodes.ConnectionError,
                        message: "SQL server connection error"
                    }
                    reject(error);
                }
                else {
                    connection.query(query, (queryError: Error | undefined, queryResult: localSroreId [] | undefined) => {
                        if(queryError) {
                           const error: systemError = {
                            code: ErrorCodes.QueryError,
                            message: "Incorrect SQL query"
                           };
                            reject(error);
                        }
                        else{
                            if(queryResult) {
                                queryResult.forEach((storeId: localSroreId) => {
                                    result.push(
                                        this.parseLocalStores(storeId)
                                    );
                                });
                            }
                            resolve(result);
                        }
                    })
                }
            });
        });
    }

    
    public getStoreByIdI(store_id: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            let result: store;
            const sql: SqlClient = require("msnodesqlv8");

            sql.open(DB_CONNECTION_STRING, (connectionError: Error, connection: Connection) => {
                if (connectionError) {
                    reject(ErrorHelper.parseError(ErrorCodes.ConnectionError, ErrorMessages.SqlQueryError));
                }
                else {
                    connection.query(`${Queries.StoreById} ${store_id}`, (queryError: Error | undefined, queryResult: localSroreId[] | undefined) => {
                        if (queryError) {
                            reject(ErrorHelper.parseError(ErrorCodes.QueryError, ErrorMessages.SqlQueryError));
                        }
                        else {
                            if (queryResult !== undefined && queryResult.length === 1) {
                                result = this.parseLocalStores(queryResult[0]);
                            }
                            else if (queryResult !== undefined && queryResult.length === 0) {
                                // TODO: Not found
                            }

                            resolve(result);
                        }
                    })
                }
            });
        });
    }
    private parseLocalStores(local: localSroreId): store {
        return {
            store_id: local.store_id,
            store_name: local.store_name,
            city: local.city
        }
    }
}


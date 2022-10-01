import { SqlClient, Error, Connection } from "msnodesqlv8";
import { storeId, systemError } from '../entities';
import { ErrorCodes } from '../constants';


interface IStoreService {
    getStoreId(): Promise<storeId[]>;
}
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
export class StoreService implements IStoreService {

    public getStoreId(): Promise<storeId[]> {
        return new Promise<storeId[]> ((resolve, reject) => {
            const result: storeId[]=[]
            const sql: SqlClient = require("msnodesqlv8");

            const connectionString: string = "server=DESKTOP-MRQ963D\\MSSQLSERVER3;Database=Store;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
            const query: string = "SELECT * FROM store";
        
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
                                        this.parseLocalStoreId(storeId)
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
    private parseLocalStoreId(local: localSroreId): storeId {
        return {
            store_id: local.store_id,
            store_name: local.store_name
        }
    }
    
}


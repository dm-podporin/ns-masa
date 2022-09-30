import { SqlClient, Error, Connection } from "msnodesqlv8";
import { storeId } from '../entities';


interface IStoreService {
    getStoreId(): string;
}
interface localSroreId {
    store_id(): number;
    store_name(): string;
    city(): string;
}
export class StoreService implements IStoreService {
    public getStoreId(): string {
        const sql: SqlClient = require("msnodesqlv8");

        const connectionString: string = "server=DESKTOP-MRQ963D\\MSSQLSERVER3; Datebase=StoreTrusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";
        const query: string = "SELECT * FROM store";
        
        sql.open(connectionString, (connectionError: Error, connection: Connection) => {
            connection.query(query, (queryError: Error | undefined, queryResult: localSroreId [] | undefined) => {
                const result: storeId [] = [];
                if(queryResult !== undefined) {
                queryResult.forEach((storeId: localSroreId) => {
                    result.push(
                        this.parseLocalStoreId(storeId)
                    );
                });
            }
                console.log(result);
            })
        });

        return "getStoreId"
    };
    private parseLocalStoreId(local: localSroreId): storeId {
        return {
            store_id: local.store_id,
            store_name: local.store_name
        }
    }
    
}


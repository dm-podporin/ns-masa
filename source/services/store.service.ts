import { SqlClient, Error, Connection } from "msnodesqlv8";
import { systemError, store } from '../entities';
import { DB_CONNECTION_STRING, ErrorCodes, ErrorMessages, Queries } from "../constants";
import { ErrorHelper } from "../helpers/error.helpers";
import { SqlHelper } from "../helpers/sql.helpers";
import * as _ from "underscore";

interface localStore {
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
    getStoreByIdI(store_id: number): Promise<store>;
    getStoreByCityI(city: string): Promise<store[]>;
}

export class StoreService implements IStoreService {

    public getStoresI(): Promise<store[]> {
        
        return new Promise<store[]> ((resolve, reject) => {
            const result: store[]=[];
            SqlHelper.executeQueryArrayResult<localStore>(Queries.Stores)
                    .then((queryResult: localStore[]) => {
                    queryResult.forEach((stores: localStore) => {
                        result.push(this.parseLocalStores(stores));
                        });

                    resolve(result);
                })

                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }
    
    public getStoreByIdI(store_id: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            let result: store;
            SqlHelper.executeQuerySingleResult<localStore>(`${Queries.StoreById} ${store_id}`)
            .then((queryResult: localStore) => {
                    resolve(this.parseLocalStores(queryResult));
                })

                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public getStoreByCityI(city: string): Promise<store[]> {
        return new Promise<store[]>((resolve, reject) => {
            const query: string = `${Queries.StoreByCity} '%${city}%'`;
            SqlHelper.executeQueryArrayResult<localStore>(query)
                .then((queryResult: localStore[]) => {
                    resolve(_.map(queryResult, (result: localStore) => this.parseLocalStores(result)));
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    private parseLocalStores(local: localStore): store {
        return {
            store_id: local.store_id,
            store_name: local.store_name,
            city: local.city
        }
    }
}


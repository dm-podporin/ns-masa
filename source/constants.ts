export class ErrorCodes {
    public static ConnectionError: number = 100;
    public static QueryError: number = 101;
    public static NoData: number = 102;
}
export class ErrorMessages {
    public static DbConnectionError: string = "DB ser connection erverror";
    public static SqlQueryError: string = "Incorrect query";
    public static NoDataFound: string = "Not found";
}

export class Queries {
    public static Stores : string = "SELECT * FROM store";
    public static StoreById : string = "SELECT * FROM store WHERE store_id = ";
}

export const DB_CONNECTION_STRING : string = "server=DESKTOP-MRQ963D\\MSSQLSERVER3;Database=Store;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}"
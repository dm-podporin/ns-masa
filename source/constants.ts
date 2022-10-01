export class ErrorCodes {
    public static ConnectionError: number = 100;
    public static QueryError: number = 101
}
export class ErrorMessages {
    public static ObConnectionError: string = "DB ser connection erverror";
    public static SqlQueryError: string = "Incorrect query";
}

export class Queries {
    public static Stores : string = "SELECT * FROM store";
    public static StoreId : string = "SELECT * FROM store";
}

export const DB_CONNECTION_STRING : string = "server=DESKTOP-MRQ963D\\MSSQLSERVER3;Database=Store;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}"
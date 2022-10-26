export class ErrorCodes {
    public static ConnectionError: number = 100;
    public static QueryError: number = 101;
    public static NoData: number = 102;
    public static NonNumericInput: number = 103;
    public static InputParameterNotSupplied: number = 104;
}
export class ErrorMessages {
    public static DbConnectionError: string = "DB ser connection erverror";
    public static SqlQueryError: string = "Incorrect query";
    public static NoDataFound: string = "Not found";
    public static NonNumericInput: string = "Non numeric input supplied";
    public static InputParameterNotSupplied: string = "Input parameter not supplied";
}

export class Queries {
    public static Stores : string = "SELECT * FROM store";
    public static StoreById : string = "SELECT * FROM store WHERE store_id = ?";
    public static StoreByCity: string = "SELECT * FROM store WHERE city LIKE ";
}

export class SqlParameters {
     public static Id: string = "id";
}

export const DB_CONNECTION_STRING : string = "server=DESKTOP-MRQ963D\\MSSQLSERVER3;Database=Store;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}"
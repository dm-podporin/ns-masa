interface IStoreService {
    getStoreId(): string;
}

export class SchoolService implements IStoreService {
    public getStoreId(): string {
        return "getStoreId"
    }
}

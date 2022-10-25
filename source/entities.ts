export interface store{
    store_id: number;
    store_name: string;
    city: string
}

export interface systemError {
    code: number;
    message: string;
}
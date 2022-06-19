export interface ApiResponse<T> {
    Status: boolean;
    StatusCode: number;
    Message: string;
    Data: T;
}
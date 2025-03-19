export type APIResponse<T> = {
    data: T[];
    message: string;
    result: true;
}
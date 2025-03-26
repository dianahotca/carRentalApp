export type APIResponse<T> = {
    data: T | T[] | LoginResponseData | null;
    message: string;
    result: true;
}

export type LoginResponseData = {
    userId: number,
    emailId: string,
    token: string,
    refreshToken: string,
}
import { Customer } from "../customer"

export type CustomersApiResponse = {
    result: boolean,
    data: Customer[],
    message: string;
}
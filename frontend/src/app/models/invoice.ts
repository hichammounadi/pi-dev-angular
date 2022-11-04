import { User } from "./user";

export interface Invoice {
    _id?: String,
    name?: String,
    amount?: number,
    user?: User,
    address?: String,
    type?: String,
    status?: String
}

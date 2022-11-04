import { User } from "./user";

export interface CreditCard {
    _id?: String,
    bank?: String,
    balance?: number,
    user?: User
}

import { User } from "./user";

export interface Identity {
    _id?:String,
    firstName?: String,
    lastName?: String,
    father?:String,
    mother?:String,
    gender?: String,
    occupation?: String,
    address?: String,
    birth?: String,
    identity?: String,
    status?: String,
    user?: User,
}

import { User } from "./user";

export interface Bulletin {
    _id?: string,
    name?: string,
    user?: User,
    firstName?: string,
    lastName?: string,
    father?: string,
    mother?: string,
    identity?: string,
    birth?: string,
    occupation?:string,
    status?:string
}

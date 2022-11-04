import { User } from "./user";

export interface Bulletin {
    name?: String,
    user?: User,
    firstName?: String,
    lastName?: String,
    fatherName?: String,
    motherName?: String,
    identity?: String,
    status?:string
}

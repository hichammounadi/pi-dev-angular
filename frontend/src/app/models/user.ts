export interface User {
    _id?: String,
    fullname?: String,
    email?: String,
    role?: String
}


export interface LoginUser {
    email?: String,
    password?: String,
}

export interface RegisterUser {
    fullname?: String,
    email?: String,
    password?: String,
}
export interface TokenUser {
    fullname?: String,
    userId?: String,
    role?: String,
}



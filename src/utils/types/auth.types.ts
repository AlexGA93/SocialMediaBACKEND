export interface UserType {
    id?             : number;
    name            : string;
    second_name     : string;
    age             : number;
    email           : string;
    password?       : string;
    role            : string;
    registered_at?  : Date;
}

export interface PasswordType {
    id?             : number;
    id_user         : string;
    user_password   : string;
    registered_at?  : Date;
}
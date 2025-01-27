import { Role } from "./Role.model";

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    repeatPassword: string;
    roles: Role[];
}
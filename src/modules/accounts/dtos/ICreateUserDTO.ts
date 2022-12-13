interface ICreateUserDTO {
    name: string;
    password: string;
    email: string;
    driverLicense : string;
    avatar?: string;
}

export { ICreateUserDTO };

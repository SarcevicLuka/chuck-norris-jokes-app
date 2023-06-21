type UserRegistrationData = {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

type UserLoginData = {
    email: string,
    password: string,
}

export { UserRegistrationData, UserLoginData }
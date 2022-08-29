const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

export function validateEmail(email: string): boolean {
    return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
    return !!password;
}
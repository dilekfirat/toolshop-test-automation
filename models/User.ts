export interface User {
    first_name: string;
    last_name: string;
    password: string;
    phone: string;
    email: string;
    dob: string;
    address: {
        street: string;
        house_number: string;
        city: string;
        state: string;
        country: string;
        postal_code: string;
    };
}
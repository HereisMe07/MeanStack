// use this ! is to tell typescript that this field will definitely be assigned a value
// at some point, even if not in the constructor
export class Customer {
    _id!: string;
    name!: string;
    email!: string;
    phone!: string
    address!: string;
}
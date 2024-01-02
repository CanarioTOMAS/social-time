export class User {
id: string
name: string
surname: string
email: string
password: string
role: string
image: string
address: string
gender: string
phone: string

constructor(
    name:string,
    surname:string,
    email:string,
    password:string,
    role:string
    ){
    this.name = name
    this.surname = surname
    this.email = email
    this.password = password
    this.role = role
    }
}
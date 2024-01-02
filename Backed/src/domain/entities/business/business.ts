export class Business {
    id: string
    name: string
    address: string
    category: string
    email: string
    image: string
    phone: string
    
    constructor(
        name:string,
        email:string,
        category: string
        ){
        this.name = name
        this.email = email
        this.category = category
        }
    }

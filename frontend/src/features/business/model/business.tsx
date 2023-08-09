export interface IBusiness {
    name: string;
    phone: string;
    email: string;
    address: string;
    businessCategory: string;
    image: string;
    touched: string;
  }
  export type IiBusiness = Pick<
    IBusiness,
    "name" | "phone" | "address" | "email"
  >;
  
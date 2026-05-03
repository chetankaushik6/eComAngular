export interface SignupData{
    name:string;
    email:string;
    password:string
}

export interface LoginData{
      email:string;
      password:string;
}

export interface ProductData{
    id: string;
    name:string;
    price:number;
    category:string;
    color:string;
    description:string;
    image:string;
}
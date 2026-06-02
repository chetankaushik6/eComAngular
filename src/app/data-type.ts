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
    quantity:undefined | number;
}

export interface cartData{
    id: string | number | undefined;
    name:string;
    price:number;
    category:string;
    color:string;
    description:string;
    image:string;
    quantity:undefined | number;
    userId: string | number | undefined;
    productId: string | number | undefined;
}
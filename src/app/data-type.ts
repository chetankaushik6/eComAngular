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
    productId: string | number | undefined;
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
    status?: string;
}

export interface priceSummary{
    price:number;
    discount:number;
    tax:number;
    deliveryCharges:number;
    total:number;
}

export interface orderData{
    userId: string | number | undefined;
    email:string;
    address:string;
    contact:string;
    paymentMethod:string;
    subtotal:number;
    shipping:number;
    totalAmount:number;
    items:cartData[];
    id: string | number | undefined;
}
export interface CartItem{
    sneakerId:string;
    variationId:string;
    quantity: number;
}

export interface Cart {
    [key:string]:CartItem;
}
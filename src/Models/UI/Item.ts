import { IsNotEmpty, IsString } from 'class-validator';

import { IsOneOf } from 'Helpers/Validation/IsOneOf';

export enum ItemSize {
    S   = "S",
    M   = "M",
    L   = "L",
    XL  = "XL",
    XXL = "L"
}

export class Item {
    
    @IsString()
    @IsNotEmpty()
    name : string;
    
    @IsNotEmpty()
    date : Date;
    
    @IsOneOf( Object.values( ItemSize ) )
    size : ItemSize;
}
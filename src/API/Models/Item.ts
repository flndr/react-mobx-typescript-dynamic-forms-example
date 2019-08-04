import { Type }                                                       from 'class-transformer';
import { IsBoolean, IsDefined, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

import { IsOneOf }        from 'Helpers/Validation/IsOneOf';

// This File describes the Item how it's sent from the API

export enum ItemSize {
    Default   = '',
    One       = 1,
    Two       = 2,
    Small     = "s",
    Medium    = "m",
    Large     = "L",
    VeryLarge = "XXL"
}

export const ItemDateFormat = 'DD.MM.YYYY';

export class Item {
    
    @IsString()
    @IsNotEmpty()
    name : string;
    
    @IsDefined()
    @IsString()
    date : string;
    
    @ValidateNested()
    @Type( () => ItemProperties )
    properties : ItemProperties;
}

export class ItemProperties {
    
    @IsOneOf( Object.values( ItemSize ) )
    size : ItemSize;
    
    @IsBoolean()
    isValid : boolean;
}
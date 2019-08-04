import { Type }           from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { Item } from 'API/Models/Item';

export class Response {
    
    @ValidateNested()
    @Type( () => Item )
    items : Item[];
}
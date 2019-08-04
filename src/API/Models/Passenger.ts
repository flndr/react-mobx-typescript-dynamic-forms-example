import { Person }           from 'API/Models/Person';
import { IsBoolean, IsInt } from 'class-validator';

export class Passenger extends Person {
    
    @IsBoolean()
    isPayingCustomer : boolean;
    
    @IsInt()
    id : number;
}
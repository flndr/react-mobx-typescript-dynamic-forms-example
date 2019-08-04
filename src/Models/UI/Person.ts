import { IsDate, IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

import { IsOneOf } from 'Helpers/Validation/IsOneOf';

// This File describes the Person how it's sent from the API

export enum PersonGender {
    Male   = 'Male',
    Female = 'Female',
    Other  = "Other"
}

export class Person {
    
    @IsNotEmpty()
    firstName : string;
    
    @IsString()
    lastName : string;
    
    @ValidateIf( person => person.gender !== null )
    @IsString()
    title : string | null;
    
    @ValidateIf( person => person.gender !== null )
    @IsOneOf( Object.values( PersonGender ) )
    gender : PersonGender | null;
    
    @ValidateIf( person => person.birthday !== null )
    @IsDate()
    birthday : Date | null;
    
    get isMale() : boolean {
        return this.gender === PersonGender.Male;
    }
    
    get isFemale() : boolean  {
        return !this.isMale;
    }
    
}
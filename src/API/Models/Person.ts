import { IsInt, IsNotEmpty, IsString } from 'class-validator';

import { IsOneOf } from 'Helpers/Validation/IsOneOf';

// This File describes the Person how it's sent from the API

export enum PersonSalutation {
    Mr    = 'Herr',
    Mrs   = 'Frau',
    MrDr  = "Herr Dr.",
    MrsDr = "Frau Dr."
}

export class Person {
    
    @IsNotEmpty()
    firstName : string;
    
    @IsString()
    lastName : string;
    
    @IsOneOf( Object.values( PersonSalutation ) )
    salutation : PersonSalutation;
    
    @IsInt()
    birthDay : number;
    
    @IsInt()
    birthMonth : number;
    
    @IsInt()
    birthYear : number;
}
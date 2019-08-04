import { registerDecorator, ValidationOptions } from "class-validator";

export function IsMomentFormat( format : string, validationOptions? : ValidationOptions ) {
    return function ( object : Object, propertyName : string ) {
        registerDecorator( {
            name         : "IsMomentFormat",
            target       : object.constructor,
            propertyName : propertyName,
            constraints  : [],
            options      : validationOptions,
            validator    : {
                validate( value : any ) {
                    console.log( 'alter?', value );
                    let isValid = false;
                    
                   
                    
                    console.log( 'IsMomentFormat', value, isValid );
                    return isValid;
                }
            }
        } );
    };
}
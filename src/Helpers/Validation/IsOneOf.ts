import { registerDecorator, ValidationOptions } from "class-validator";

export function IsOneOf( strings : any[], validationOptions? : ValidationOptions ) {
    return function ( object : Object, propertyName : string ) {
        registerDecorator( {
            name         : "isMomentFormat",
            target       : object.constructor,
            propertyName : propertyName,
            constraints  : [],
            options      : validationOptions,
            validator    : {
                validate( value : any ) {
                    return strings.includes( value );
                }
            }
        } );
    };
}
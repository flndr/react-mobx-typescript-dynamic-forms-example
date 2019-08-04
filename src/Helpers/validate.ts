import { validate }                   from 'class-validator';
import { classToPlain, plainToClass } from 'class-transformer';
import { ValidationError }            from 'class-validator/validation/ValidationError';
import { ValidatorOptions }           from 'class-validator/validation/ValidatorOptions';
import { ClassType }                  from 'class-transformer/ClassTransformer';

export function getInstance<T, V>( cls : ClassType<T>, plain : V ) : T {
    
    const instance = plainToClass<T, V>( cls, plain );
    
    return instance;
}

export async function getValidatedData<T, V>( cls : ClassType<T>, plain : V, options? : ValidatorOptions ) : Promise<{}> {
    const instance = await getValidatedInstance<T, V>( cls, plain, options || {} );
    const p        = classToPlain<T>( instance );
    return p;
}

export async function getValidatedInstance<T, V>( cls : ClassType<T>, plain : V, options? : ValidatorOptions ) : Promise<T> {
    
    const instance = plainToClass<T, V>( cls, plain );
    
    const errors = await validate( instance, options || {} );
    
    if ( errors.length > 0 ) {
        console.log( 'Validation Errors: ', errors );
        console.log( 'Validation Data: ', plain );
        throw new Error( 'Validation failed.' );
    }
    
    return instance;
}

export async function getValidationErrors<T, V>( cls : ClassType<T>, plain : V, options? : ValidatorOptions ) : Promise<ValidationError[]> {
    
    const instance = plainToClass<T, V>( cls, plain );
    
    const errors : ValidationError[] = await validate( instance, options || {} );
    
    return errors;
}

declare type ErrorsPlain = { [ fieldName : string ] : string | ErrorsPlain };

export async function getValidationErrorsPlain<T, V>( cls : ClassType<T>, plain : V, options? : ValidatorOptions ) : Promise<ErrorsPlain> {
    const errors : ValidationError[] = await getValidationErrors<T, V>( cls, plain, options || {} );
    const errorsPlain : ErrorsPlain  = flattenErrorMessages( errors, {} );
    
    return errorsPlain;
}

export async function throwPlainValidationErrorsIfAny<T, V>( cls : ClassType<T>, plain : V, options? : ValidatorOptions ) : Promise<void> {
    const errorsPlain : ErrorsPlain = await getValidationErrorsPlain( cls, plain, options );
    if ( Object.keys( errorsPlain ).length > 0 ) {
        throw errorsPlain;
    }
}

function flattenErrorMessages( errorsNested : ValidationError[], errorsPlain : ErrorsPlain ) : ErrorsPlain {
    errorsNested.forEach( ( e : ValidationError ) => {
        const constraints = Object.keys( e.constraints || {} );
        if ( constraints.length > 0 ) {
            errorsPlain[ e.property ] = e.constraints[ constraints[ 0 ] ];
        } else if ( e.children ) {
            errorsPlain[ e.property ] = flattenErrorMessages( e.children, Object.assign( {}, errorsPlain ) );
        }
    } );
    
    return errorsPlain;
}


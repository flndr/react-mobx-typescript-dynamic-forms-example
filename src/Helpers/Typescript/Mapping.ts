import { plainToClass } from 'class-transformer';
import { ClassType }    from 'class-transformer/ClassTransformer';
import { validate }     from 'class-validator';

export default class Mapping<I, O> {
    
    private static INPUT_VALIDATION_ERROR : string  = 'Input data does not validate with input class.';
    private static OUTPUT_VALIDATION_ERROR : string = 'Mapping function is not returning a valid instance.';
    
    private inputPlain : any;
    private inputClass : ClassType<I> | null  = null;
    private outputClass : ClassType<O> | null = null;
    
    public of( inputClass : ClassType<I>, inputPlain : any ) : Mapping<I, O> {
        this.inputPlain = inputPlain;
        this.inputClass = inputClass;
        return this;
    }
    
    public to( outputClass : ClassType<O> ) : Mapping<I, O> {
        this.outputClass = outputClass;
        return this;
    }
    
    public async with( mappingFunction : ( input : I ) => Promise<O> ) : Promise<O> {
        
        this.checkClasses();
        
        const inputInstance = plainToClass( this.inputClass!, this.inputPlain );
        
        await Mapping.validate<I>( inputInstance, Mapping.INPUT_VALIDATION_ERROR );
        
        const outputPlain    = await mappingFunction( inputInstance );
        const outputInstance = plainToClass( this.outputClass!, outputPlain );
        
        await Mapping.validate<O>( outputInstance, Mapping.OUTPUT_VALIDATION_ERROR );
        
        return outputInstance;
    }
    
    public withLazyValidation( mappingFunction : ( input : I ) => O ) : O {
        
        this.checkClasses();
        
        const inputInstance = plainToClass( this.inputClass!, this.inputPlain );
        
        Mapping.validate<I>( inputInstance, Mapping.INPUT_VALIDATION_ERROR );
        
        const outputPlain    = mappingFunction( inputInstance );
        const outputInstance = plainToClass( this.outputClass!, outputPlain );
        
        Mapping.validate<O>( outputInstance, Mapping.OUTPUT_VALIDATION_ERROR );
        
        return outputInstance;
    }
    
    public likeThis( mappingFunction : ( input : I ) => O ) : O {
        this.checkClasses();
        const inputInstance  = plainToClass( this.inputClass!, this.inputPlain );
        return plainToClass( this.outputClass!, mappingFunction( inputInstance ) );
    }
    
    public  async withOutputValidation( mappingFunction : ( input : I ) => O ) : Promise<O> {
        this.checkClasses();
        const inputInstance  = plainToClass( this.inputClass!, this.inputPlain );
        const outputInstance = plainToClass( this.outputClass!, mappingFunction( inputInstance ) );
    
        await Mapping.validate<O>( outputInstance, Mapping.OUTPUT_VALIDATION_ERROR );
        
        return outputInstance;
    }
    
    private static async validate<G>( instance : G, invalidMessage : string ) : Promise<void> {
        const errors = await validate( instance );
        
        if ( errors.length > 0 ) {
            console.warn( invalidMessage, errors );
            throw new Error( invalidMessage );
        }
    }
    
    private checkClasses() {
        if ( !this.inputClass ) {
            throw new Error( 'Input class is undefined.' );
        }
        if ( !this.outputClass ) {
            throw new Error( 'Output class is undefined.' );
        }
    }
}
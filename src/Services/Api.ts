import { plainToClass }     from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ClassType }        from 'class-transformer/ClassTransformer';

import { RealWorldApiDummy }            from 'API/RealWorldApiDummy';
import { Request as GetItemsRequest }   from 'API/Endpoints/GetItems/Request';
import { Response as GetItemsResponse } from 'API/Endpoints/GetItems/Response';
import ItemToUI                         from 'API/Mapper/ItemToUI';
import { Item as ItemForUI }            from 'Models/UI/Item';

class Api {
    
    async getItems() : Promise<ItemForUI[]> {
        
        const params = await checked<GetItemsRequest>( GetItemsRequest,
            { limit : undefined } );
        
        const response = await checked<GetItemsResponse>( GetItemsResponse,
            await RealWorldApiDummy.getItems( params ) );
        
        return await Promise.all( response.items.map( i => ItemToUI( i ) ) );
    }
    
}

async function checked<T>( cls : ClassType<T>, plainOrInstance : T ) : Promise<T> {
    
    const instance = plainOrInstance instanceof cls
                     ? plainOrInstance
                     : plainToClass( cls, plainOrInstance );
    
    await validateOrReject( instance );
    
    return instance;
}

const api = new Api();

export default api;
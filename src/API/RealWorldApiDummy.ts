import random from 'lodash/random';

import timeout from 'Helpers/timeout';

import { Request as GetItemsRequest }   from './Endpoints/GetItems/Request';
import { Response as GetItemsResponse } from './Endpoints/GetItems/Response';

export class RealWorldApiDummy {
    
    static async getItems( req : GetItemsRequest ) : Promise<GetItemsResponse> {
        await timeout( random( 500, 2500 ) );
        const response = {
            items : [
                {
                    name       : "Item One",
                    date       : "01.12.2018",
                    properties : {
                        size    : 'L',
                        isValid : true
                    }
                }
                ,
                {
                    name       : "Item 2",
                    date       : "08.12.2018",
                    properties : {
                        size    : 's',
                        isValid : true
                    }
                }
            ]
        };
        return response as GetItemsResponse;
    }
    
}
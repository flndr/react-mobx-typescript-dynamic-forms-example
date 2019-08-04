import moment from 'moment';

import Mapping from 'Helpers/Typescript/Mapping';

import { Item as ItemFromAPI, ItemDateFormat, ItemSize as ItemSizeFromAPI } from 'API/Models/Item';
import { Item as ItemForUI, ItemSize as ItemSizeForUI }                     from 'Models/UI/Item';

export default async ( i : ItemFromAPI ) =>
    (new Mapping<ItemFromAPI, ItemForUI>())
    .of( ItemFromAPI, i )
    .to( ItemForUI )
    .withOutputValidation( itemFromApi => {
        const itemForUI = new ItemForUI();
        itemForUI.name  = itemFromApi.name;
        
        itemForUI.date = moment( itemFromApi.date, ItemDateFormat ).toDate();
        
        switch ( itemFromApi.properties.size ) {
            case ItemSizeFromAPI.Default :
            case ItemSizeFromAPI.One :
            case ItemSizeFromAPI.Small :
                itemForUI.size = ItemSizeForUI.S;
                break;
            case ItemSizeFromAPI.Two:
            case ItemSizeFromAPI.Medium:
                itemForUI.size = ItemSizeForUI.M;
                break;
            case ItemSizeFromAPI.Large:
                itemForUI.size = ItemSizeForUI.L;
                break;
            case ItemSizeFromAPI.VeryLarge:
                itemForUI.size = ItemSizeForUI.XL;
                break;
            default:
                break;
        }
        return itemForUI;
    } );
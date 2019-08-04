import { Person as PersonFromAPI, PersonSalutation } from 'API/Models/Person';

import Mapping                                 from 'Helpers/Typescript/Mapping';
import { Person as PersonForUI, PersonGender } from 'Models/UI/Person';

export default async ( p : PersonFromAPI ) =>
    (new Mapping<PersonFromAPI, PersonForUI>())
    .of( PersonFromAPI, p )
    .to( PersonForUI )
    .withOutputValidation( personFromApi => {
        const personForUI     = new PersonForUI();
        personForUI.gender    = null;
        personForUI.title     = null;
        personForUI.firstName = personFromApi.firstName;
        personForUI.lastName  = personFromApi.lastName;
        personForUI.birthday  = new Date(
            personFromApi.birthYear,
            personFromApi.birthMonth - 1,
            personFromApi.birthDay );
        
        switch ( personFromApi.salutation ) {
            case PersonSalutation.Mr :
                personForUI.gender = PersonGender.Male;
                break;
            case PersonSalutation.MrDr:
                personForUI.gender = PersonGender.Male;
                personForUI.title  = 'Dr.';
                break;
            case PersonSalutation.Mrs :
                personForUI.gender = PersonGender.Female;
                break;
            case PersonSalutation.MrsDr:
                personForUI.gender = PersonGender.Female;
                personForUI.title  = 'Dr.';
                break;
            
            default:
                break;
        }
        return personForUI;
    } );

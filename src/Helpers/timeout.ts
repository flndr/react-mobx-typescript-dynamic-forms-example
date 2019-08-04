export default function timeout( time : number ) : Promise<void> {
    return new Promise( resolve => {
        setTimeout( () => {
            // could be written shorter, but this way we can add a breakpoint here
            // console.log( `... waited ${time}ms` );
            resolve();
        }, time );
    } );
}
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//
export function asLiterals<T extends string>( arr : T[] ) : T[] { return arr; }
//
//const statuses = [ "open", "working", "completed" ];
//
//const statusesAsLiteral = asLiterals( statuses );
//type StatusesType = typeof statusesAsLiteral[number];
//
//function logStatus( s : StatusesType ) {
//    console.log( 'Status: ' + s );
//}
//
//logStatus( 'blah' ); // wrong type, but no error
//console.log( statuses[ 'open' ] ); // type error, no longer works
//
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//
//const furniture = [ 'chair', 'table', 'lamp' ] as const;
//type Furniture = typeof furniture[number];
//
//function logFurniture( f : Furniture ) {
//    console.log( 'Furniture: ' + f );
//}
//
//logFurniture( 'chair' );
//logFurniture( 'table' );
//logFurniture( 'stool' ); // cool!
//
//console.log( furniture[ 'chair' ] ); // type error, no longer works
//
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//
//const Colors = {
//    red   : "RED",
//    blue  : "BLUE",
//    green : "GREEN",
//} as const;
//
//function logColor( c : string ) {
//    console.log( 'Color: ' + c );
//}
//
//logColor( "GREEN" ); // cool!
//logColor( Colors.blue ); // cool!
//logColor( "PINK" ); // meh, no error
//
//console.log( Colors[ 'GREEN' ] ); // type error, no longer works
//
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//
//enum Size {
//    Small     = "s",
//    Medium    = "m",
//    Large     = "L",
//    VeryLarge = "XL"
//}
//
//function logSize( s : Size ) {
//    console.log( 'Size: ' + s );
//}
//
//// logSize( 's' ); // doesnt work - but ok, we've got this:
//logSize( Size.Small );
//logSize( Size.VeryLarge );
//
//const sizeValues = Object.values( Size );
//
//// console.log( sizeValues[]  ); // type error, no longer works
//
//
//
//
//
//enum Size {
//    Default   = '',
//    One       = 1,
//    Two       = 2,
//    Small     = "s",
//    Medium    = "m",
//    Large     = "L",
//    VeryLarge = "XXL"
//}
//
//function logSize( s : Size | string ) {
//    console.log( 'Size: ' + s );
//}
//
//logSize( Size.Small );
//logSize( Size.VeryLarge );
//logSize( "M" );
//
//const sizeValues = Object.values( Size );
//
//console.log( sizeValues ); // ["s", "m", "L", "XL"]
//console.log( sizeValues.includes( 's' ) ); // true
//console.log( sizeValues.includes( Size.VeryLarge ) );// true

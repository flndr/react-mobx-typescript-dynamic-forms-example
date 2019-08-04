# TS Best Practice

### Be specific aka (type)safe
You wont get the full potential out of typescript
 if you dont use strict mode.
 
Don't use "any". Rather describe whats expected. 
Use union types and/or Partial for example.
```typescript
function workWith( t : This | Partial<That>  ) {
  if(t instanceof That && t.hasOwnProperty('id')) {
      // ...
  }
}
```

Be careful with type casting, it will tell the 
compiler to ignore type errors in this line.
```typescript
return res as ValidResponse; // warning: res could be anything!
```

In your tsconfig.json: 
```json
{
"strict" : true,
"strictNullChecks" : true
}
```

### Dont trust external sources

Defensive programming. Throw early. Better have an 
"API sent wrong data" error then an "Cant access 
something of undefined" in a nested UI component!

* User Input
* URL Parameters
* Session or Browser Storage
* Ajax Responses

You have to describe what is expected by using 
classes. Map external data to class instances and validate them.
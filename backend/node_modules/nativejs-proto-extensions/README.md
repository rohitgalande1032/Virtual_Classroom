# Native JavaScript extension

We can find many libraries offering new objects with advanced functionnalities.

Sometimes we have a need for a native JavaScript object that intuitively should 
have a method that allows it.
When this does not exist, all that remains is to create your own function to 
which you must pass its object as arguments.

**JavaScript** allows native objects to be extended using **prototypes**.
The strength of prototypes is that we manipulate the very definition of the 
object and any instantiated object will have new functionality.
This will therefore be available at any time for any extended object
simplifying the writing of the code as well as the declaration.

In these needs, I wrote my own prototypes.
I decided to group them together and make a library.

Its use simply boils down to a `require`.
From there, native objects were extended and functionality available.


## Summary

[](MakeSummary)



## ``Date`` extension


### Method ``getDaysInMonth``



### Method ``isLastDay``



### Method ``getFirstDay``



### Method ``offsetMonth``






## ``Math`` extension


### Method ``froundx``






## ``MozNamedAttrMap`` extension


### Method ``find``



### Method ``findAll``






## ``NamedNodeMap`` extension


### Method ``find``



### Method ``findAll``






## ``Object`` extension


### Method ``getValueForPath``

Please considering the following object variable :

````js
let myObject = {
   1: {
       "name": "SUCCESS",
       "color": "fg.Sucess",
       "return": 0,
       "object": {
           "pty": "value",
           "pty2": [
               'a'
           ]
       },
       "array": [
           1,2,3
       ]
   }
};
````

Thanks to extension ``getValueForPath``, you can easily
obtain value for deep property doing like that :

````js
myObject.getValueForPath('1.name');        // Return : SUCCESS
myObject.getValueForPath('1.object.pty2'); // Return : [ 'a' ]
````

An another way to get deep property value is to use Object prototype :

````js
Object.getValueForPath('1.name', myObject); // Return : SUCCESS
````



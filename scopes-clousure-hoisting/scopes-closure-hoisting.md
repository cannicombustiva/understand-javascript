# What about Scopes Hoinsting and Closure?

When we started the primary school, the teachers didn't ask to write the next Divine Comedy, but they taught us how to write 
the ABC. OK, how can we start? Simply from our environment, our notebook.

## Salvatore, it would be better if you explain what we are learning

Oh dear, ok. First of all we can introduce the terms **Scopes** **Hoinsting** and **Closure**

- **Scope**: the current context of execution. What a definition!
             You have to think it like a house with his rooms. In each room, made up with { }, there are a lot of
             stuffs. That's it, the scope. the stuffs are the variables and the scope is the place where there are these stuffs.

- **Hoisting** : it's a javascript feature where variables and functions are declared on the top of the scope.

- **Closure** : this give you access to foreign scopes. It'is like a corridor that connects the rooms.

## Let's go with the examples

1. 

```js
var variable = 10;
(()=>{
   console.log(variable);
   var variable = 20;
   console.log(variable);
})();
```

Guess the logs and go down.

WAIT WAIT WAIT
Before you continue you have to know the difference between **compiled** and **interpreted** language
- **compiled** : the source file typically will be “compiled” to machine code (or byte code) before being executed.
- **interpreted** :  the source code will be read and directly executed, line by line.

Javascript is the second one and every time we write like the code above, js we'll read like:

```js
var variable; //1
variable = 10;
(()=>{
   var variable; //2
   console.log(variable);   // undefined
   variable = 20;
   console.log(variable);   // 20
})();
```
Here we got the first practical example of hoisting: the variables "variable" are declared on top of their scopes 
(remember, the scope was the room mades up by { }). The first "variable" is on top of first scope and the second
"variable" is on top of the child scope.
So we can easly answer `undefined` `20`. In the child scope variable is declared but not assigned, only on a second time the value 20
is assigned.

Little excursus, rewriting the first code, using LET:

```js
var variable = 10;
(()=>{
   console.log(variable);   
   let variable = 20;
   console.log(variable);   
})();
```

We'll see a different output: `Reference Errore: Cannot access 'variable'
before initialization`. LET and CONST introduce something called "The temporal dead zone" that means we can't use variables declared with these keywords
before their definition.

In simple terms, if we wrote
```js
var jesus = 10;
```
Because of hoisting we'll have:
```js
var jesus;
jesus = 10;
```
so if we add a console.log like this:
```js
console.log(jesus)
var jesus = 10;
```
we'll get an `undefined`. But if we write the same lines using LET:

```js
console.log(jesus)
let jesus = 10;
```
there is no hoisting so the console.log will say "Oh man what the hell is this "jesus"?" and then it will die.

2. 
```js
var variable = 10;
(()=>{
   console.log(variable); 
   variable = 20;
   console.log(variable);   
})();
```

Guess the logs and go down.

Let's explain what the hell is happening here.

## "But Salvatore, this variable = 20 is undeclared in our scope"

You son of a... We talked about scope like a room of a house. The house is the **global object**.
Actually if we wrote something like the code above, js is interpreted like this:

```js
window.variable;
window.variable = 10
(()=>{
   console.log(variable);
   window.variable = 20;
   console.log(variable);
})();
```

``variable = 20`` is declared on this way ``window.variable``.
``var variable = 10`` and ``variable = 20`` belong to the same ``variable``. For the hoisting, 
the declaration of ``variable = 20`` goes on top of our global scope.
``window`` is the global object, in which there are our custom functions (with their local scope).

> **ProTip:** Every variable and function declared inside window object is readable everywhere in the code..

```js
window.variable;             //  global scope
window.variable = 10         //  global scope
(()=>{
   console.log(variable);    // local scope
   window.variable = 20;     // local scope
   console.log(variable);    // local scope
})();
```

In the logs, we'll have 10 and 20.

## Are you ready for the next battle?

3. 
Let's look at the code:
```js
var variable = 10;
(()=>{
   variable_3 = 35;
   console.log(variable_3); 
   var variable_3 = 45;
   variable_2 = 15;
   console.log(variable); 
})();

console.log(variable_2);
console.log(variable_3);
var variable=30;
```

Guess the logs and go down

This is the result of the intepreter:

```js
window.variable;
window.variable_2;
variable = 10;
(()=>{
   var variable_3;
   variable_3 = 35;
   console.log(variable_3);
   variable_3 = 45;
   variable_2 = 15;
   console.log(variable); 
})();

console.log(variable_2); 
console.log(variable_3); 
variable=30;
```

Ahh this is funny. We got a lot of stuffs here.
Let's analyze the code step by step:

```js
var variable = 10;
(()=> {
  ...magicStuffs
})
console.log(variable_2);
console.log(variable_3);
var variable=30;
```

can be wrote like:

```js
window.variable;      //global
window.variable = 10  //global
(()=> {
  ...magicStuffs      //local
})
console.log(variable_2);    //global
console.log(variable_3);    //global
window.variable=30;         //global
```

This happened because of hoisting. At the top of global scope we declare `variable`.
Now, take a look inside the function, inside local scope:

```js
(()=> {
   variable_3 = 35;
   console.log(variable_3); 
   var variable_3 = 45;
   variable_2 = 15;
   console.log(variable); 
})
```

`var variable_3 = 45` is declared on the top of local scope and `variable_2 = 15` goes on the top of
global scope as `window.variable_2`. Result?:

```js
(()=> {
   var variable_3;
   variable_3 = 35;
   console.log(variable_3);
   variable_3 = 45;
   variable_2 = 15;
   console.log(variable); 
})
```

So inside global scope are declared `variable` and `variable_2` and inside local scope
is declared `variable_3`.
The result of the logs is `35` `10` `15` and `ReferenceError`.

Why ReferenceError? simply because as well as we said `variable_3` is declared inside local scope and the father scope (global object) can't access to child scope (function scope).





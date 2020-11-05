# What about Scopes Hoinsting and Closure?

When we started the primary school, the teachers didn't ask to write the next Divine Comedy, but they taught us how to write 
the ABC. OK, how can we start? Simply from our environment, our notebook.

## Salvatore, it would be better if you explain what we are learning

Oh dear, ok. First of all we can introduce the terms **Scopes** **Hoinsting** and **Closure**

- **Scope**: ihe current context of execution. What a definition!
             You have to think it like a house with his rooms. In each room there are a lot of
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



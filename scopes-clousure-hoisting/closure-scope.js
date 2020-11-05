/* 
    SCOPES HOISTING AND CLOSURES

    SCOPES: Determina l'accessibilità di variabili funzioni e oggetti nel codice durante il run-time

    HOISTING: Meccanismo di js in cui le dichiarazioni delle variabili AVVENGONO all'inizio del loro scope
              prima dell'esecuzione del programma

    CLOSURE:  da l'accesso allo scope della funzione esterna da una funzione interna

*/

//---------DOMANDA 1 -----------------------|

var variable = 10;
(()=>{
   console.log(variable);
   var variable = 20;
   console.log(variable);
})();

// QUALE SARA' L'OUTPUT? -> 10 20
//                          undefined 20
//                          20 20

//---------RISPOSTA 1 -----------------------|

// undefined 20 A CAUSA DELL'HOISTING
//js vedrà il codice di cui sopra come:

var variable = 10;
(()=>{
   var variable;
   console.log(variable);   // undefined
   variable = 20;
   console.log(variable);   // 20
})();

/*
Javascript lascia l'assegnazione della variabile (variable=20) così com'è ma la dichiara all'inizio dello
scope della funzione. Quindi la variabile viene dichiarata ma mai inizializzata prima del primo
console.log

Piccolo excursus, riscrivendo il primo codice, ma con LET
*/

var variable = 10;
(()=>{
   console.log(variable);   
   let variable = 20;
   console.log(variable);   
})();

/* non avremo lo stesso risultato, bensì un Reference Errore: Cannot access 'variable'
before initialization. LET e CONST introducono qualcosa chiamato 'The temporale dead zone' che
significa semplicemente che non si possono usare queste variabili prima che siano state definite 

IN PAROLE POVERE SE SCRIVI VAR GESU = 10, L'HOISTING TE LO PORTA IN TESTA COME VAR GESU; E POI TI FA
L'ASSEGNAZIONE, QUINDI SE FAI CONSOLE.LOG(GESU) E POI VAR GESU = 10 TI STAMPA UN BEL UNDEFINED (IL CANCRO IN CODICE),
MENTRE SE FAI LA STESSA COSA CON LET, NON CE N'E' HOISTING QUINDI QUANDO FAI CONSOLE.LOG(GESU) LET GESU=10
JS TI DICE "MPA CHE SPACCHIO E' STA MERDA" E TI DA ERRORE COME FANNO I VERI PRO PLAYER
!!!!!!!!!!!!!! RICORDATELO PERCHE' NE VA DEL TUA VITA !!!!!!!!!!!!!!!!!!!
*/


//---------DOMANDA 2 -----------------------|

var variable = 10;
(()=>{
   console.log(variable); 
   variable = 20;
   console.log(variable);   
})();

// QUALE SARA' L'OUTPUT? -> 10 20
//                          undefined 20
//                          20 20

//---------RISPOSTA 2 -----------------------|
/* la risposta è 10 20 perché per il suo closure il primo console.log
prende il valore fuori dal suo scope */

//---------DOMANDA 3 -----------------------|

var variable = 10;
(()=>{
   console.log(variable);   
   variable = 20;
   console.log(variable);  
})();
var variable = 30;
console.log(variable);

// QUALE SARA' L'OUTPUT? -> undefined 20 30
//                          10 20 30
//                          undefined 20 10

//---------RISPOSTA 3 -----------------------|
/* la risposta è 10 20 30...perché? ecco come viene interpretato il codice da javascript */

var variable;
variable = 10;
(()=>{
   console.log(variable);   //10
   variable = 20;
   console.log(variable);   //20
})();
variable = 30;
console.log(variable);     //30

//---------DOMANDA 4 -----------------------|

var variable = 10;
(()=>{
   console.log(variable);   
   var variable = 20;
   console.log(variable);   
})();

console.log(variable);
var variable = 30;

// QUALE SARA' L'OUTPUT? -> undefined 20 30
//                          10 20 30
//                          undefined 20 10

//---------RISPOSTA 4 -----------------------|

/* la risposta è undefined 20 10, ecco come è interpretato */

var variable;
variable = 10;
(()=>{
   var variable;
   console.log(variable);   //undefined
   variable = 20;
   console.log(variable);  //20
})();
console.log(variable);  //10
variable = 30;

//---------DOMANDA 5 -----------------------|

var variable = 10;
(()=>{
   console.log(variable);
   variable = 20;
   console.log(variable);
})();

console.log(variable);
var variable = 30;

/* Adesso le opzioni sono queste -->   undefined 20 30
                                       undefined 20 10
                                       undefined 20 20
                                       10 20 20
                                       10 20 30
                                       10 20 10

*/

//---------RISPOSTA 5 -----------------------|

var variable;
variable = 10;
(()=>{
   console.log(variable); //10
   variable = 20;
   console.log(variable);  //20
})();

console.log(variable);  //20
variable = 30;

/* 
   qui notiamo che per l'hoisting la prima e la terza variabile vengono dichiarate una volta
   e la seconda variabile assume il cambio valore per mezzo del closure
   quindi avremo 10 20 20

*/

//---------DOMANDA 6 -----------------------|

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

//---------RISPOSTA 5 -----------------------|

/*
   35 10 15 ReferenceError: variable_3 is not defined

*/

var variable;
var variable_2;
variable = 10;
(()=>{
   var variable_3;
   variable_3 = 35;
   console.log(variable_3); //35
   variable_3 = 45;
   variable_2 = 15;
   console.log(variable); //10
})();

console.log(variable_2); //15
console.log(variable_3); //error
variable=30;

/*
   questa è bastarda: vediamo cosa succede nel codice interpretato subito sopra:
   Praticamente qui la dichiarazione di variable, diventa unica e per l'hoisting 
   viene messa nel top del globale. 

   VEdiamo che succede dentro la funzione invece:
   allora var variable_3 = 45 per l'hoisting diventa var variable_3; e va al top dello scope
   poi le si assegna il valore di 35 e stampa 35, e poi si assegna 45.

   Adesso abbiamo un variable_2 = 15;
   come fuzniona qui la cosa? quando c'è una roba del genere è come se si scrivesse
   windows.variable_2 = 15 (o global.variable_2 in nodejs) quindi per l'hoisting nel global scope 
   succede var variable_2; e dentro la funzione le si assegna il valore 15

   poi abbiamo un console.log(variable); che stampa 10 per la closure (accede al valore al di fuori della funzione)

   Fuori dalla funzione abbiamo console.log(variable_2); che stampa 15 (valore assegnatogli dentro la funzione, ma essende una variabile
      definita nel global scope, questa assegnazione avviene normalmente).
   Poi per ultimo abbiamo console.log(variable_3); che ci darà un ReferenceError: variable_3 is not defined:
   beh qui essendo in una funzione padre, non si può accedere allo scope del figlio, quindi non sa da dove prendere questo valore.

*/
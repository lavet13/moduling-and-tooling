'use strict';

// Object.freeze only freezes the first level of the object. So it's not a so-called deep freeze because we
// can still change objects inside of the object.
const budget = Object.freeze([
    { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
    { value: -45, description: 'Groceries 🥑', user: 'jonas' },
    { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
    { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
    { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
    { value: -20, description: 'Candy 🍭', user: 'matilda' },
    { value: -125, description: 'Toys 🚂', user: 'matilda' },
    { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

// we can
// budget[0].value = 10000;

// we cannot
// budget[9] = 'jonas';

// const limit = spendingLimits[user] ? spendingLimits[user] : 0;

// Now, this function here is no longer depends on any external variable. It can do all it's work without having to look up in the scope chain
const getLimit = (user, limits) => limits[user] ?? 0;

// spendingLimits is now immutable
const spendingLimits = Object.freeze({
    jonas: 1500,
    matilda: 100,
});

// side effect means that something outside of a function is manipulated or that the function does something other than simply returning a value.
// And so a function that has, or that produces side effects is called an impure function.
// So how do we fix that? first of all, we should always pass all the data that the function depends on into the function, so that it doesn't have to
// reach into the outer scope. And then of course, the function shouldn't change any of these values.
// We shouldn't pass more than three arguments into a function. Now, in this case, we actually have five parameters, but well,
// sometimes it's not a big deal to break those rules. We could also pass in simply one object of options basically, but let's keep it simple.

// this function is no longer produce side effects. It's officially a pure function.

// in the real world, we would use something called composing and the technique called currying to basically create the chain of operations here.
const addExpense = function (
    { state, spendingLimits, value, description },
    user = 'jonas'
) {
    // user = user.toLowerCase(); // avoid data mutations whenever possible
    const cleanUser = user.toLowerCase();

    return value <= getLimit(cleanUser, spendingLimits)
        ? [
              ...JSON.parse(JSON.stringify(state)),
              //   ...state,
              {
                  value: -value,
                  description,
                  user: cleanUser,
              },
          ]
        : // : state;
          JSON.parse(JSON.stringify(state));
};

const newBudget1 = addExpense({
    state: budget,
    spendingLimits,
    value: 10,
    description: 'Pizza 🍕',
});

const newBudget2 = addExpense(
    {
        state: newBudget1,
        spendingLimits,
        value: 100,
        description: 'Going to movies 🍿',
    },
    'Matilda'
);

const newBudget3 = addExpense(
    { state: newBudget2, spendingLimits, value: 200, description: 'Stuff' },
    'Jay'
);

// Let's turn our attention to data transformations here in this case.
// to transform this function into a pure function:
// 👉 we want to pass in all the data that the function depends on
// 👉 return the state(data) or a copy of the state

// Note: we transformed this function here into a pure function, which does not mutate anything because the map
// method here returns a brand new array, so we give this function an array and it will then create a new one
// simply by mapping over the original one. And in each position of the array, we then either return a copy
// of the original entry + the flag property or simply we return the original entry as it was. With this our
// function is nice and pure and doesn't create any side effect and doesn't manipulate anything.
// WE SHOULD ALWAYS PASS ALL THE DATA THAT WE NEED FOR A CERTAIN FUNCTION TO WORK RIGHT INTO THAT FUNCTION
// SO THAT, AGAIN, IT DOESN'T DEPEND ON ANY OUTSIDE DATA, BECAUSE IN PRACTICE THAT THIS MAKES IT A LOT EASIER
// TO REASON ABOUT THE FUNCTION ITSELF. IF YOU DO THAT FOR ALL OF YOUR FUNCTIONS, THEN IN THE END THAT WILL MAKE
// YOUR CODE A LOT EASIER TO UNDERSTAND AND A LOT MORE READABLE.
const checkExpenses = function (state, limits) {
    // it makes sense to use the map method here, that's in the spirit of functional code and of immutability
    // So not mutating the state, but instead creating a new state based on the original one.
    return state.map(entry => {
        // in the map function whatever is returned from the callback will be the element in the same position of
        // the new array
        const { user, value } = entry;

        return value < -getLimit(user, limits)
            ? { ...entry, flag: 'limit' }
            : JSON.parse(JSON.stringify(entry));
    });
};

// simplier version of the function
// const checkExpenses = (state, limits) =>
//     state.map(entry =>
//         entry.value < -getLimit(entry.user, limits)
//             ? { ...entry, flag: 'limit' }
//             : JSON.parse(JSON.stringify(entry))
//     );

const finalBudget = checkExpenses(newBudget3, spendingLimits);

console.log(finalBudget);

const logBigExpenses = function (state, bigLimit) {
    // WE ARE ACTUALLY CONSTANTLY MANIPULATING OR MUTATING THIS OUTPUT VARIABLE HERE. AND THAT OF COURSE, GOES AGAINST THE SPIRIT
    // OF IMMUTABILITY. SO IMMUTABILITY IS OF COURSE NOT JUST FOR OBJECTS AND ARRAYS. THIS ALSO GOES FOR MORE REGULAR VARIABLES.
    // AND SO IN FUNCTIONAL CODE, YOU WILL PROBABLY NEVER SEE THE LET VARIABLE. SO WE'RE ALWAYS TRYING TO COMPUTE A VARIABLE,
    // FOR EXAMPLE, BASED ON METHODS SUCH AS map, filter, reduce etc.
    // let outside = '';
    // for(const entry of state) output += entry.value <= -bigLimit ? `${entry.description.slice(-2)} / ` : '';
    // outside = outside.slice(0, -2); // remove last '/ '
    // console.log(output);

    // the question is how we could create a string simply based on pure and functional functions, so data transformations functions for arrays,
    // and also for strings actually.

    // use case of reduce is to basically take all the values in one array and create one value out of them, so reduce them all into just one.
    // in this case what we want is our string.
    // return state
    //     .reduce(
    //         (str, { value, description }) =>
    //             value <= -bigLimit
    //                 ? (str += `${description.slice(-2)} / `)
    //                 : str,
    //         ''
    //     )
    //     .slice(0, -2);

    return state
        .filter(({ value }) => value <= -bigLimit)
        .map(entry => entry.description.slice(-2))
        .join(' / ');
};

const bigExpense = logBigExpenses(finalBudget, -300);
console.log(bigExpense);

// A LITTLE BIT ABOUT IMPURE FUNCTIONS
// console.logs create input output which are impure because they do something, so they create a side-effects to our program.
// but of course any program needs to have some side-effects because otherwise, what is the point of the program in the first place?
// if we didn't have all of these console.logs, how would we even know that the program is running in the first place? It wouldn't be useful at all.
// we always need some side effects, but in functional programming, we try to push these side effects as far to the edge, so as far to the end of our program
// as possible, so without having them all over the place polluting our application.

// DEVELOP 🧓
// For example, you can add a function for adding the income, or you can also create functions for calculating the total expenses and incomes, the overall budget,
// how much the expenses are in percentage of the income and so on and so forth.

///////////////////////////////////////////
// Declarative and Functional JavaScript Principles
// There is currently a major trend and shift to something called declarative code and functional programming in JavaScript.
// So, there are two fundamentally different ways of writing code in programming, which we also call paradigms. And these
// two paradigms are imperative and declarative code.

// Imperative programming
// Whenever we write imperative code, we basically need to explain to the
// computer how to do a certain things. So basically, we need to explain every single step that the computer needs to follow
// in order to achieve a certain result. Example: let's say that we want someone to bake a cake for us. And so, if we would
// do that in imperative way, we would tell the person exactly the step by step recipe that they would have to follow in
// order to bake that cake, so it's telling every single step that the person has to follow in order to achieve a result.
// And now bringing that back into code, here in this code example
/*
    const arr = [2, 4, 6, 8];
    const doubled = [];
    for(let i = 0; i < arr.length; i++) 
        doubled[i] = arr[i] * 2;
*/
// this loop that i have here is a purely imperative way of writing that. So, here we are telling the computer step by step,
// to create an empty array to create a counter that starts at zero, then to increase that counter until we reach the length
// of the original array and then how exactly to store the new result in each new position of the array. So, there's a lot of
// steps that we really give the computer here, in order for us to achieve the result of doubling "arr" array.

// Declarative programming
// Where the programmer tells the computer only what to do. And so, when we write declarative code, we simply describe the way
// that the computer should achieve a certain result. But how it should do it, so basically, the step by step instructions, they
// get abstracted away, so we do not care about them. Ang going back to our cake example here, the declarative way of instructing
// someone to bake the cake would be to simply describe that cake to the person, and then the person would have to come up
// with the step by step recipe on their own. So, simply describing the task, and the result that should be achieved is the
// declarative way of doing it. And now coming back to the code example of duplicating the values in an array, this is how
// we do it in the declarative way.

/*
    const arr = [2, 4, 6, 8];
    const doubled = arr.map(n => n * 2);
*/

// We simply tell the JavaScript that it should map the values in the "arr" array to a new array, and each of these values should
// be multiplied by two.

// All we are doing is describing the way that the computer should achieve the result that we are looking for. We are simply
// telling it what to do, which in this case, is to simply map the original array onto a new array and doubling all the elements.
// All those super detailed steps that we have in imperative code, like creating an empty array and initializing a counter,
// all of these steps have been abstracted away, because we don't really care about them. And this is pretty important to understand
// because more and more this is how modern JavaScript code is actually written.

// So, the difference between imperative and declarative is not just some theoretical difference. So, the declarative paradigm is
// actually a really big and popular programming paradigm, which has even given rise to a sub paradigm called functional programming.

// Functional programming
// it's basically a declarative paradigm, which is based on the idea of writing software, simply by combining multiple so called pure
// functions, while avoiding side effects and mutating data. And actually, functional programming and writing declarative code,
// has now basically become the modern way of writing code in the JavaScript world. So, you will see declarative and functional code
// everywhere. And in fact, we have even been using it all along, but without really knowing that this style was called declarative
// and functional.

// SIDE EFFECTS
// it's basically simply a modification of any data that's outside of a function (e.g. mutating any variable that is external to the
// function is causing a side effect). Data does not only refer to variables, so for example, logging stuff to the console, or
// also changing something in the DOM is also causing side effects.

// PURE FUNCTION
// Now next up, a pure function, is a function without side effects.
// So, basically a function that does not mutate any external variables, and that does also not depend on any external variables.
// So basically, if we give the same inputs to a pure function, it will always return the same output and again, that's because
// it does not depend on any external variables, and it also does not manipulate them.
// And finally, if we look again, at our definition, we also see that functional programming is about avoiding mutating data,
// and we do that by using something called immutability.

// IMMUTABILITY
// So in functiona programming, state, which also means basically data is never modified.
// So, let's say that we have some application, and we have an object there to keep track of all the data that we need in an application.
// And so that we usually called state, and so again, in functional programming, that state is never modified. Instead, what we will do is to
// copy that object, so that state, and then it is that copy that is mutated, and can then be returned, but the original state is never touched.
// So, that's what it means for the state being immutable, and the big upside of immutability is that, it makes it so much easier to keep track
// of how the data flows through our entire application. And so ultimately, that will allow us to write better code with less bugs, and code
// that is also more readable, which overall, is the entire goal of using functional programming in the first place.

// Many of the popular libraries, such as React or Redux, are actually built around all of these principles. So for example, in React, the state is
// also completely immutable, and so if you ever want to learn something like React, you will need to know about these concepts in order to use it
// properly. However, some principles such as pure functions, or side effects, can actually be a bit easier to implement into our own code.
// We can actually mix imperative and declarative programming in our own code, we don't have to go 100% in the direction of making our code completely functional.
// We can already start using some of the functional programming techniques in our own code base. So for example, you can try to avoid data mutations as often as
// possible. And of course, this will not always be possible, but it's not really necessary. So these are mainly and are just suggestions, but which will still
// create more readable and overall better and cleaner code. Another thing that you can do is to always prefer built in methods or functions that do not produce
// side effects over the ones that do, and this is really important for data transformations. So whenever you want to do that, you should use the methods, such as
// map, filter and reduce. So this is the functional and modern way of doing data transformations, and many times, this is actually the first contact that many
// people have, with functional programming. So map, filter and reduce are actually present in all functional programming languages, and they are very important
// to implement a functional code and more declarative code in our code. And finally, you can also try to avoid side effects into functions that you write yourself.
// And again, this is of course, not always possible, and also not always necessary. So we will never be able to avoid all side effects in applications, because
// of course, at some point, the application needs to do something. So, it needs to display something on the DOM, or log something to the console, or really create
// some side effect. But you can still try to think about this, and to start incorporating side effects more into your own code. And now to finish, let's come back
// to declarative syntax, because functional programming is only a part of using and writing declarative code. So, in order to write code that is more declarative,
// you should use array and object destructuring whenever that's possible. You should also use the spread operator, the ternary operator, and also template literals
// whenever that is possible, because if you think about it, then all of these four ways of writing code, actually makes the code more declarative. So, these operators
// are more about telling the code what to do, and not exactly the steps that it should take. And that's, again, true for all these four pieces of syntax.

// FUNCTIONAL PROGRAMMING TECHNIQUES
// 👉 Try to avoid data mutations
// 👉 Use built-in methods that don't produce side effects
// 👉 Do data transformations with methods such as .map(), .filter() and .reduce()
// 👉 Try to avoid side effects in functions: this is of course not always possible!

// DECLARATIVE SYNTAX
// 👉 Use array and object destructuring
// 👉 Use the spread operator (...)
// 👉 Use the ternary (conditional) operator
// 👉 Use template literals

// Functional programming
// 👉 Declarative programming paradigm
// 👉 Based on the idea of writing software by combining many pure functions, avoiding side effects and mutating data
// 👉 Side effect(red): Modification (mutation) of any data outside of the function (mutating external variables, logging to console, writing to DOM, etc.)
// 👉 Pure functions: Function without side effects. Does not depend on external variables. Given the same inputs, always returns the same outputs.
// 👉 Immutability: State (data) is never modified! Instead, state is copied and the copy is mutated and returned.

// Examples: REACT, REDUX

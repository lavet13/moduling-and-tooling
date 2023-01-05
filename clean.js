const budget = [
    { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
    { value: -45, description: 'Groceries 🥑', user: 'jonas' },
    { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
    { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
    { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
    { value: -20, description: 'Candy 🍭', user: 'matilda' },
    { value: -125, description: 'Toys 🚂', user: 'matilda' },
    { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
];

const getLimit = user => spendingLimits[user] ?? 0;

const spendingLimits = {
    jonas: 1500,
    matilda: 100,
};

const addExpense = function (value, description, user = 'jonas') {
    // const limit = spendingLimits[user] ? spendingLimits[user] : 0;

    value <= getLimit(user.toLowerCase()) &&
        budget.push({ value: -value, description, user });
};

addExpense(10, 'Pizza 🍕');
addExpense(100, 'Going to movies 🍿', 'Matilda');
addExpense(200, 'Stuff', 'Jay');

console.log(budget);

const checkExpenses = function () {
    budget.forEach(entry => {
        const { user, value } = entry;

        value < -getLimit(user) && (entry.flag = 'limit');
    });
};

checkExpenses();

console.log(budget);

const logBigExpenses = function (bigLimit) {
    const output = budget
        .reduce(
            (acc, entry) =>
                entry.value <= -bigLimit
                    ? (acc += `${entry.description.slice(-2)} / `)
                    : acc,
            ''
        )
        .slice(0, -2);

    console.log(output);
};

logBigExpenses(-300);

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
// to implement a functional code

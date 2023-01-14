///////////////////////////////////////////////////////////
// An Overview of Modern JavaScript Development
// So back in a day, we used to write all our code into one big script or maybe multiple scripts. But today, we divide our projects into multiple modules.
// They make our code more organized and maintainable. Now, one great thing about modules is that we can also include 3rd-party modules.
// There are thousands of open source modules, which we also call packages, that developers share on the NPM repository. And we can then use these packages for free in
// our code. For example, popular React framework or Leaflet library that we used before in Mapty Project. All these packages are available through NPM.
// NPM stands for Node Package Manager, because it was originally developed together with Node.js and for Node.js. However, NPM has established itself as the go to
// repository for all kinds of packages in Modern JavaScript Development. In order to actually download and use and share packages, we use the NPM software installed
// on our computer. This is just a simple command line interface that allows us to do all that. So basically NPM is both the repository in which packages live and
// a program that we use on our computer to install and manage these packages. So let's say that we are done writing our project code. So we divided it into multiple
// modules and we included some 3rd-party modules as well. And so development step is complete. However, usually that's not the end of the story.

// At least not when we building a real world application. Instead, our project now needs to go through a build process, where one big final JavaScript bundle is built.
// And that's the final file, which we will deploy to our web server for production. So basically it's the JavaScript file, that will be sent to browsers in production.
// And production simply means that the applciation is being used by real users in the real world.
// He isn't going into such details, only two steps.

// First step: we will bundle all our modules together into one big file. This is a pretty complex process which can eliminate unused code and compress our code as well.
// Now this step is super important for two big reasons. First, older browsers don't support modules at all. And so code that's in a module could not be executed.
// by any older browser. And second, it's also better for performance to send less files to the browser, and it's also beneficial(выгодный) that the bundling step
// compresses our code.

// Second step: we do something called transpiling and polyfilling, which is basically to convert all modern JavaScript syntax and features back to old ES5 syntax,
// so that even older browsers can understand our code without breaking. And this is usually done using a tool called Babel.

// So these are the two steps of our build process, and after these two steps, we end up with that final JavaScript bundle, ready to be deployed on a server for
// production. Now of course we don't perform these steps ourselves. Instead, we use a special tool to implement this build process for us. And the most common
// build tools available are probably Webpack and Parcel. And these are called JavaScript bundlers because well as the name says they take our raw code and
// transform it into a JavaScript bundle. Now Webpack is the more popular one but it can be really hard and confusing to set it up. So that's because there's
// a lot of stuff that we need to configure manually in order to make it work properly. Parcel, on the other hand is a zero configuration bundler, which simply
// works out of the box. And so in this bundler, we don't have to write any set up code, which is really amazing. So I personally absolutely love Parcel and I use it
// all the time, and I think you will love it too. And so, that is the JavaScript bundler that we gonna use later in the section. Now these development tools are
// actually also available on NPM. So just like packages that we include in our code, we will download and manage tools using NPM as well. And these tools include
// the live-server that we've been using all along, the Parcel bundler that we just talked about or Babel to transpile code back to ES5. All right, so this is a high
// level overview, of how we develop Modern JavaScript applications today.

/////////////////////////////////////////////////////////////////////
// An Overview of Modules in JavaScript
// Module is a reusable piece of code that encapsulates implementation details of a certain part of our project. Now that sounds a bit like a function or even a class,
// but the diff is that a module is usually a standalone file. Now that's not always the case, but normally when we think of a module we think of a separate file.
// So of course a module always contains some code but it can also have imports and exports. So with exports, as the name says, we can export values out of a module
// for example, simple values or even entire functions. And whatever we export from a module is called the public API. So this is just like classes where we can also
// expose a public API, for other code to consume. Now, in the case of modules, this public API is actually consumed by importing values into a module. So just like
// we can export values, in modules, we can usually also import values from other modules. And these other modules from which we import are then called
// dependencies of the importing module because the code that is in the module that is importing cannot work without the code, that it is importing from the external
// module. And this entire logic that I just described is true for all modules in all programming languages. So this is not specific to only JavaScript. In fact, modules
// are a pattern that developers have been using in all languages for decades. Now, of course we can write code without modules, and actually we've been doing that
// up until this point. But that's because our applications have been very simple. However, when a code base grows bigger and bigger, there start to be many
// advantages of using modules. And the first one is that modules make it really easy to compose(создавать) software. So we can think of modules as small building blocks
// that we can then put together in order to build really complex applications.

// Isolating components essentially means that each module can be developed in isolation without the developer having to think about the entire code base.
// He doesn't even need to understand all of it, which makes it really easy to collaborate on a larger team. Next up modules make it very easy to abstract code.
// We can use modules to implement low level code, then other modules, which don't really care about these low level details can import these abstractions and use them
// The screen module of the camera, for example, does not care about the low level implementation details of the controller module. It can simply import the controller,
// but without knowing how it works and use it to control other parts of the camera.

// Modules also naturally lead to a more organized codebase. Because when we break up our code into separate isolated and obstructed modules, this will automatically
// organize our code and make it easier to understand. And so this alone is a huge benefit of modules.

// Finally modules allow us to easily reuse the same code in a project and even across multiple projets. For example, if we use a module to implement a couple of
// mathematical functions in a certain project, and if we then need the same functions in the next project, all we need to do is to copy that module to the new project.
// And in our camera example, this company could now use the exact same lens or the exact same screen in diff camera models, all because they nicely abstracted these
// components into self-contained reusalbe modules. So this is how modules work in software design in general.

// ✔ Compose software: Modules are small building blocks that we put together to build complex applications;
// ✔ Isolate components: Modules can be developed in isolation without thinking about the entire codebase;
// ✔ Abstract code: Implement low-level code in modules and import these abstractions into other modules;
// ✔ Organized code: Modules naturally lead to a more organized codebase;
// ✔ Reuse code: Modules allow us to easily reuse the same code, even across multiple projects;

// NATIVE JAVASCRIPT (ES6) MODULES
// So as of ES6, JavaScript has a native built-in module system. Now we did have modules before ES6, but we had to implement them ourselves or use external libraries.
// So ES6 modules are modules that are actually stored in files and each file is one module. So there is exactly one module per file. But now you might be thinking,
// well, scripts are usually also files and that's of course true. And so let's compare these two types of files in order to understand that there are actually huge
// differences between old school scripts and modern ES6 modules.

// First difference: In modules, all top level variables are scoped to the module. So basically variables are private to the module by default. And the only way
// an outside module can access a value that's inside of a module is by exporting that value. But if we don't export, then no one from the outside can see the variable.
// Now in scripts, on the other hand, all top level variables are always global. And this can lead to problems like global namespace pollution, where multiple scripts
// try to declare variables with the same name and then these variables collide. Private variables are the solution to this problem. And that's why ES6 modules
// implemented like this.

// Next ES6 modules are always executed in strict mode while scripts on the other hand are executed in sloppy mode by default. So with modules, there is no more need
// to manually declare strict mode. Also the "this" keyword is always undefined at the top level while in scripts it points at the window object.
// there is something really important to note about imports and exports, which is the fact that they can only happen at the top level. So as you know outside of
// any function or any if block, and we will see why that is in a second. Also all imports are hoisted. So no matter where in the code you're importing values,
// it's like import statement will be moved to the top of the file. So in practice importing values is always the first thing that happens in a module.
// Now, in order to link a module to an HTML file, we need to use the script tag with the type attribute set to module, instead of just a plain script tag.
// And finally about downloading the module files themselves. This always automatically happens in an asynchronous way. And this is true for a module loaded
// from HTML as well as for modules that are loaded by importing one module into another using the import syntax. Now regular scripts on the other hand are downloaded
// by default in a blocking synchronous way, unless we use the async or defer attributes on the script tag.

// IMPORTING MODULES BEFORE EXECUTION
// 👉 Modules are imported synchronously
// 👉 Possible thanks to top-level ("static") imports, which make imports known before execution
// 👉 This makes bundling and dead code elimination possible

// So export values are not copied to imports. Instead, the import is basically just a reference to the exported value, so like a pointer. So when the value changes
// in the exporting module, then the same value also changes in the importing module. And this is quite important to understand because it's unique to ES6 modules.
// Other module systems don't work like this, but JavaScript modules do.

////////////////////////////////////////////////////
// Exporting and Importing in ES6 Modules

// IMPORTING NAMED EXPORTS
// actually we didn't use "use strict" because all modules are executed in strict mode by default
console.log('Importing module');

// Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);

// actually we can take this importing even further, because we can also import all the exports of a module at the same time
// import * as ShoppingCart from './shoppingCart.js'; // object containing everything that is exported from the module that we'll specify

// basically if we think about this, this module here is now basically exporting a public API, just like a class. So it's as if this object ShoppingCart was an object
// created from a class, just turn your the attention to the fact that some things here look pretty similar, and actually we can say that module exports,
// kind of a public API, because everything else of course stays private inside of the module.

// const { addToCart } = ShoppingCart;

// addToCart('bread', 5);

// IMPORTING DEFAULT EXPORTS

// we can give it any name that we want
import add from './shoppingCart.js';

// Imports are in fact a life connection to exports
add('pizza', 2);
add('bread', 5);
add('apples', 4);

// We don't see an empty object, instead we have array of objects that we just added to the cart by calling the add function
import { cart } from './shoppingCart.js'; // that proves that this import here, is in fact, not simply a copy of the value that we exported,
// because if it was, then we would simply get that empty array, because that's what this cart variable looked like by the time we exported it, so it's not simply a copy.
// it's a life connection(the exact same objects behind the scenes).
// IMPORTS ARE NOT COPIES OF THE EXPORT. THEY ARE INSTEAD LIKE A LIFE CONNECTION AND SO WHAT THAT MEANS IS THAT THEY POINT TO THE SAME PLACE IN MEMORY.
// OTHERWISE IF IT WAS A COPY THEN, WE WOULD NOT GET ANYTHING IN THE ARRAY.
console.log(cart);

// we could even mix all of them in the same import statement, so if we wanted we could have default and named imports and exports all at the same time.
// However in practice, we usually never mix Named and Default Exports in the same module. So this is not really desirable here.
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// add('pizza', 2);
// addToCart('bread', 5);
// console.log(price, tq);

// So the preffered style is to actually to just use one default export per module, and then import that here like we did. And in fact, that's the reason why it is
// easier to import a Default Exports. so don't even need to use the curly braces, and the designers of the specification did that on purpose. but of course that's not
// a rigid rule, that we always need to follow, so we can do whatever is best for any given situation. However, what you probably should really not do is to mix
// Default and Named Exports like we did above. so avoid that to reduce complexity. But besides that, you can use Named Exports or Default Exports, whatever works best
// in your situations.

/*
////////////////////////////////////////////////
// Top-Level await (ES2022)
// We can now basically use the await keyword outside of an async function, which we call top-level await, this only works in modules. If we gonna try in a normal script
// like we have been using before this section, then top level await would still fail, so it would not work at all. In HTML file should have script tag to have
// an attribute type=module in order to make top-level await actually work.

// Now, what's really, really important to understand here is that while this is all great and very useful, this actually blocks the execution of the entire module now.
// Anyway long story short, just make sure that you use this new superpower that you just got with great caution.

// This example illustrates exactly how top-level await works, but it's a bit too simple. It's not really real world enough.
// console.log('Start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();

// data.forEach(({ id, body, title, userId }) => {
//     console.log(id, body, title, userId);
// });

// console.log('Something');

const getLastPost = async function () {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!res.ok) throw new Error('Fetch error');

        const data = await res.json();

        const { body, title } = data.at(-1);
        return { body, title };
    } catch (err) {
        throw err;
    }
};

console.log('Start fetching post');
// const lastPost = getLastPost();

// lastPost
//     .then(({ body, title }) => console.log(body, title))
//     .catch(err => console.error(err.message));

(async function () {
    try {
        const { body, title } = await getLastPost();
        console.log(body, title);
    } catch (err) {
        console.error(err.message);
    }
})();

console.log('Finish fetching post');

// One more important implication of using top-level await that is the fact that if one module imports a module which has a top-level await, then the importing module
// will wait for the imported module to finish the blocking code.
// So again, it's very important to remember that using top-level await, so await outside of any async function, will block the entire module in a way that we really
// couldn't block code execution before. And so this is not only a really helpful tool, but also one that we need to use with great care.
*/

/*
////////////////////////////////////////////////
// The Module Pattern
// Used to use before in order to implement modules in JavaScript. It's very good application of many of the stuff that we have been learning throughout the course.
// main goal: encapsulate functionality to have private data, and to expose a public API. And the best way of achieving all that is by simply using a function.

// usually we write an IIFE(immediately invoked function expression), and the reason for that is because this way we don't have to call it separately and we can
// also ensure(гарантировать, обеспечивать) that it's only called once, the only purpose of this function is to create a new scope and return data just once.
const ShoppingCart2 = (function () {
    // all of this data here is private because it is inside of the scope of the function.
    // And so now all we have to do is to return some of this stuff in order to basically return a public API.
    // So to do that, we simply return an object, which contains the stuff that we want to make public.
    const cart = [];
    const shippingCost = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function (product, quantity) {
        cart.push({ product, quantity });
        console.log(
            // in order to produce this string here, the function will also have to use this variable that was only present at it's birthplace, but which no longer
            // does exist besides that.
            `${quantity} ${product} added to cart(shipping cost is ${shippingCost})`
        );
    };

    const orderStock = function (product, quantity) {
        console.log(`${quantity} ${product} ordered from supplier`);
    };

    // the addToCart function was created here, and so this ShoppingCart2 function is the birthplace of addToCart function and so therefore this addToCart function
    // never loses connection to it's birthplace, which was ShoppingCart2 function. And so that birthplace, so to say, is all of this scope which contains of course
    // the cart. Therefore the addToCart function can still access that cart variable. So the reason why this works is not because the cart variable is also in this
    // object, so that's not relevant because, for example, we are not using this.cart we are simply using cart.
    return {
        addToCart,
        cart,
        totalPrice,
        totalQuantity,
    };
})();

const { addToCart, cart } = ShoppingCart2;
addToCart('bread', 5);
addToCart('apples', 3);
addToCart('pizza', 2);

// ShoppingCart2 is not available in the browser's console because we are still inside of a module and everything that is in a module is private to that very module.
// console.log(ShoppingCart2);

// But of course on the other hand the properties that we basically wanted to make private, they are not accessible.
// console.log(ShoppingCart2.shippingCost); // we cannot do this 😂

console.log(cart);

// how do we, for example, have access to the cart variable and even are able to manipulate it. So how are we able to do that, even if this IIFE here, so this function
// has already returned long ago. So this function of course was only executed once in the beginning and then all it did was to return the object and assigned it to
// the variable. But then we are able to use all of this and to also manipulate the data that is inside of this function, which is the function that returned this object.
// And the answer to how all of this works like this is one more time, closures. So closures, remember, allow a function to have access to all the variables that were
// present at it's birthplace, basically.

// In essence, again, this is how the module pattern works and it works very well, and it has been working for a long time for developers, so long before ES6 modules
// even existed in JavaScript. Now, the problem is that if we wanted one module per file like we have with ES6 modules, then we would have to create different scripts,
// and link all of them in the HTML file. And that then creates a couple of problems, like we have to be careful with the order in which we declare them in HTML.
// and we would have all of the variables living in the global scope and finally, we also couldn't bundle them together using a module bundler.
// So the module pattern that we just learned about does indeed work quite good, but it has some limitations. And so that's exactly the reason why native modules
// were added to the language in ES6.
*/

/*
////////////////////////////////////////////
// CommonJS Modules
// Besides native ES modules and the module pattern, there are also other module systems, that have been used by JavaScript in the past. But they were not native JavaScript
// So they relied on some external implementations. And two examples are: AMD Modules and CommonJS modules. And in fact, CommonJS modules are worth taking a loot at.
// CommonJS modules are important for us, because they have been used in Node.js for almost all of it's existence. So only very recently, ES Modules have actually been
// implemented in Node.js. And remember, Node.js is a way of running JavaScript on a web server, outside of a browser. Now the big consequence of this is that almost all
// the modules in the npm repository still use the CommonJS module system. And the reason for that is that npm was originally only intended for Node which as they said,
// uses CommonJS. Only later npm became the standard repository for the whole JavaScript world. And so now we are basically stuck with CommonJS. And so therefore, you
// will see probably a lot of CommonJS still around. And so let's take a quick second to see what it looks like.

// just like ES6 modules, in CommonJS one file is one module.

// EXPORT
// Now of course, this is not going to work in the browser, but it would work in Node.js. export keyword is basically an object that is of course not defined in our code
// and also not in the browser. But in Node.js, it is an important object that is used.
exports.addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
        // in order to produce this string here, the function will also have to use this variable that was only present at it's birthplace, but which no longer
        // does exist besides that.
        `${quantity} ${product} added to cart(shipping cost is ${shippingCost})`
    );
}

// IMPORT
// require is not defined here in the browser environment but it is defined in Node.js because this is part of the CommonJS specification.
const { addToCart } = require('./shoppingCart.js');
*/

//////////////////////////////////////////
// Introduction to NPM
// Why do we actually need a way of managing packages or dependencies in our project? Back in day before we had NPM, we used to include external libraries
// right into our HTML. Basically using the script tag. And this would then expose a global variable that we could use and actually that's exactly what we did earlier in
// our Mapty project. Including an external library before our own script so that our own script could then use the global variable that was exposed by this library
// This actually creates a couple of problems, at least in a big project. This is simply not manageable. First, it doesn't make much sense having the HTML loading
// all of JavaScript, that is just really messy. Also many times we would actually download a library file to our computer directly, for example, a JQuery JavaScript file.
// But then whenever a new version would come out, we would have to manually go to the site, download the new version, change the file in our file system manually, and
// then include it. And that was just a huge pain. And a second reason is that before NPM, there simply wasn't a single repository that contained all the packages
// that we might need. And so this made it even worse and more difficult to manually download libraries and manage them on our computers. So in summary, this all used
// to be a huge pain and a huge mess.
// But anyway, all of this is just to say that we really need a way to manage our dependencies in a better and more modern way. And NPM is exactly how we do that.
// let's start by using the NPM software now.

// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
import _ from 'lodash';

const state = {
    cart: [
        { product: 'bread', quantity: 5 },
        { product: 'pizza', quantity: 2 },
    ],
    user: {
        loggedIn: true,
    },
};

const copyState = Object.assign({}, state);
const copyDeepState = cloneDeep(state);
console.log(`Before:`);
console.log(`state = ${JSON.stringify(state)}`);
state.user.loggedIn = false;
console.log(`After:`);
console.log(`state = ${JSON.stringify(state)}`);
console.log(`copyState = ${JSON.stringify(copyState)}`);
console.log(`copyDeepState = ${JSON.stringify(copyDeepState)}`);

/////////////////////////////////////////////
// Bundling With Parcel and NPM Scripts
// In order to still be able to use Parcel here in the console, we have two options. So we can use something called NPX or we can use NPM scripts.
// First way of using Parcel: NPX is basically an application built into a NPM. So the details don't matter, but what does matter is that we can simply use NPX.
// Second way of using Parcel: NPM scripts, and that's the way we actually use it in practice. It's another way of running a locally installed packages in the command line.
// They also allow us to basically automate repetitive tasks. And so therefore we then don't have to write "npx parcel index.html" every time that we want to use it.

// Parcel did create a folder dist which stands for distribution, because it is essentially gonna be this folder that we will send for production.
// So basically it's the code in dist folder that we will send to our final users.
// With parcel we don't really need to type the absolute path (./node_modules/lodash-es/cloneDeep.js), instead we only type the folder (lodash-es), in fact
// this works with all kinds of assets, so even with HTML or CSS or SASS files or even images, and of course also all kinds of modules. So not only ESX modules, but
// this is also going to work with CommonJS modules.

// Hot module reloading means that whenever we change one of the modules, it will then trigger a rebuild, but that new modified bundle will then automatically,
// like magic, get injected into the browser without triggering a whole page reload. So with Parcel and hot module replacement, the state of the page will be maintained.
if (module.hot) {
    module.hot.accept(() => {
        console.log(cart);
        console.log(module.hot.savedData);
        cart = [];
    });
}

// Wheneven we are done developing our project, it is time to build the final bundle. So the bundle that is compressed and has dead code elimination and all of that.
// And so for that, we need another Parcel command.

// https://parceljs.org/getting-started/webapp/ - docs
// https://parceljs.org/features/targets/ - targets

////////////////////////////////////////////////////
// Configuring Babel and Polyfilling
// Now that we activated bundling it's time to configure Babel to transpile our super modern code back to ES5 code. And this is still important right now even many
// years after the new ES6 standard has been introduced. So basically Babel works with plugins and presets that can both be configured. Now a plugin is basically
// a specific JavaScript feature that we want to transpile. So to convert. For example, we only want to convert arrow function back to ES5 but leave everything else
// in ES6 for example, const and var declarations. Now usually that doesn't make a lot of sense, because basically we will want to transpile everything at the same time.
// And so usually instead of using single plugins for each of these features, Babel actually uses presets. And so a preset is basically a bunch of plugins bundled together.
// And by default, Parcel is going to use @babel/preset-env which is going to automatically select which JavaScript features should be compiled based on browser support.
// And again that will all happen automatically and out of the box Babel will convert all features, so only browsers that are barely used anymore with the market share
// of less than 0.25% are not going to be supported by the transpiling with this preset here.
// let's write some code that is not part of this preset @babel/preset-env because this preset-env does only include final features. So feature that are already part of
// the language after passing the four stages of the AGMA process. However, previously we used class fields which at the time of recording are only at stage three.
// And so let me show you how we could transpile a class fields as well.

class Person {
    greeting = 'Hey';

    constructor(name) {
        this.name = name;
        console.log(`${this.greeting}, ${this.name}`);
    }
}

const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

console.log(cart.find(({ quantity }) => quantity >= 2));
Promise.resolve('Hello').then(str => console.log(str));

// Babel can actually only transpile ES6 Syntax, so data things like arrow functions, classes, const or the spread operator. So these are basically things that
// have an equivalent way of writing them in ES5. For example, arrow functions it is simply a different syntax. And so Babel can simply write function instead of that.
// And the same goes with const so it's very easy to simply convert that to "var" but the same is not true for real new features that were added to the language
// like find and promise so these new features they can simply not be transpiled. It's simply not possible. For these added features, such as promises or all the array
// methods like find and really bunch of other stuff, we can polyfill them. And so that's why since the beginning I've always been saying transpiling and polyfilling.
// So these new features, we have to polyfill them. Now Babel used to do polyfilling out of the box some time ago, but recently they started to simply recommending
// another library. And so we now have to manually import that as well.

// import 'core-js/stable';

// Instead of importing everything we could do this, so that's going to be a lot of work which we usually don't do, but it's possible again if you are really worried
// about your bundle size.
import 'core-js/stable/array/find';
import 'core-js/stable/promise';

// Polyfilling async functions
import 'regenerator-runtime/runtime';

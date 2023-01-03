// Exporting module
console.log('Exporting module');

// Blocking code
// console.log('Start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching users');

// Variables that are declared inside of a module, are actually scoped to this module.
// module itself is like the top level scope, by default, this means that all top level variables are private inside of this module, unless we export them
const shippingCost = 10;
export const cart = [];

// In ES modules, there are two types of exports, Named Exports and Default Exports
// Named is actually the simplest way of exporting something from a module, just put export in front of anything, that we might want to export.

////////////////////////////////
// Example of creating Named Exports

// keep in mind that exports always need to happen in top level code, it wouldn't work inside of any block code
export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
};

// We can also export multiple things from a module using Named Exports(main use case)
const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq }; // this is a little bit like exporting an object from this module, "as" keyword also works in import statement

/////////////////////////////////
// Example of creating Default Exports
// usually we use default exports when we only want to export one thing per module, and so that's the reason why they are called default.

// simply export the value itself, so not the variable, no name is involved at all.
export default function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to cart`);
}

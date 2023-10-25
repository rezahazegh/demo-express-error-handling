### Introduction
This project demonstrates how express.js behaves regarding error handling by using some pretty straightforward examples. Then, provides a solution to have cleaner syntax to handle errors.  

**Hint**: express.js behavior is different for version 5 and above.

### Trail and Error
The project includes some routes which show express behavior under different conditions:

1. `/test`  
   * We use it to check either app crashed or still working


2. `/sync`  
   * If you call this route it throws an error from within a sync route handler.  
   * if we call `test` the app would work. So, express catches it automatically and, we don't need any extra action for sync handlers. 


3. `/async-not-handled`  
   * If you call this route it throws an error from within an async route handler which is not handled.  
   * If you call `test` the app won't work and, you will see it already crashed.
   * So, we need to somehow handle errors for async handlers. we show how to do that on the next ones.


4. `/async-handled-regular`
   * If you call this route it throws an error from within an async route handler which is handled using try/catch.
   * The point is you should pass error to `next` function.
   * Now, if we call `test` the app would work.

### Magic solution
The following solution helps you to get rid of try/catch in your handlers.  

Functions in javascript are first class citizens: 
* you can pass a function as a parameter to another one. 
* Also, you can return a function as a return value.

We are going to use these features to design our solution.  

`handler` function helps us to extract try/catch from our handlers. It takes our handler as a parameter and wrap it in a try/catch in a new function. Then return the new function.

5. `/async-handled-using-handler`
   * If you call this route it throws an error from within an async route handler which is handled using `handler` function.
   * Now, if we call `test` the app would work.


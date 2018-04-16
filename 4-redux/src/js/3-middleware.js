// Step 2: import applyMiddleWare
import { applyMiddleware, createStore } from "redux";

const reducer = (initialState = 0, action) => {
  if (action.type === "INC") {
    return initialState + 1;
  } else if (action.type === "DEC") {
    return initialState - 1;
  } else if (action.type === "MULT") {
    throw new Error("AHHHH!!");
  }
  return initialState;
};
// Step 4: create middleware
// usually middleware is an npm package
// logger is an example of middleware function
const logger = store => next => action => {
  console.log("Logged", action);
  return next(action);
};
// another middleware function - catches any errors
const errorHandler = store => next => action => {
  try {
    return next(action);
  } catch (e) {
    console.log("ERROR!", e);
  }
};
// Step 3: call applyMiddleware
const middleware = applyMiddleware(logger, errorHandler);
// Step 1: Add middleware argument to createStore
const store = createStore(reducer, middleware);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

store.dispatch({ type: "INC" });
store.dispatch({ type: "INC" });
store.dispatch({ type: "INC" });
store.dispatch({ type: "DEC" });
store.dispatch({ type: "DEC" });
store.dispatch({ type: "DEC" });
store.dispatch({ type: "MULT" }); // create an error
store.dispatch({ type: "DEC" });

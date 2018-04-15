// Step 1: import combineReducers
import { combineReducers, createStore } from "redux";

// Step 2: create multiple reducers - each reducers has its own file
// I would live in a separate file
// use ES6 to set default state values
// reducers must return something
// errors will occur when reducers return nothing
// actions can trigger side effects with other reducers
// reducers are independent of each other
const userReducer = (state = {}, action) => {
  // do something to change state
  switch (action.type) {
    case "SET_NAME": {
      // make sure to destructure everything in state first
      // that way state will be overridden with new data
      return { ...state, name: action.payload };
      break;
    }
    case "SET_AGE": {
      return { ...state, age: action.payload };
      break;
    }
  }
  return state;
};

// I would live in a separate file
const tweetsReducer = (state = [], action) => {
  // do something to change state
  switch (action.type) {
    case "ADD_TWEET": {
      return state.concat({
        id: Date.now(), //fake an ID by using a timestamp
        text: action.payload
      });
      break;
    }
  }
  return state;
};
// Step 3: combine all reducers - also a file with setup code
// define pieces of data to modify
// define which reducers modify which piece of data
const reducers = combineReducers({
  // userReducer receives user data as state and modifies it
  user: userReducer,
  // tweetsReducer receives tweets data as state and modifies it
  tweets: tweetsReducer
});

const store = createStore(reducers);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

store.dispatch({ type: "SET_NAME", payload: "Will" });
store.dispatch({ type: "SET_AGE", payload: 35 });
store.dispatch({ type: "SET_AGE", payload: 34 });
store.dispatch({ type: "ADD_TWEET", payload: "OMG LIKE LOL" });
store.dispatch({
  type: "ADD_TWEET",
  payload: "I am so like seriously like totally like right now"
});

import { applyMiddleware, createStore } from "redux";
import axios from "axios";
// Step 1: import logger
import logger from "redux-logger";
// Step 3: import thunk middleware
import thunk from "redux-thunk";
// Step 6: import promise() middleware to clean up axios promise requests in dispatch
// promise() recognizes action.payload is a JS Promise object
// as a result, it auto sends dispatches for you
// ie. Pending dispatch/action
// async promises are cleaned up
import promise from "redux-promise-middleware";

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
};
// Step 5: modify reducer to change state based on incoming actions
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_PENDING": {
      return { ...state, fetching: true };
      break;
    }
    case "FETCH_USERS_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
      break;
    }
    case "FETCH_USERS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      };
      break;
    }
  }
  return state;
};
// Step 4: add thunk to middleware
const middleware = applyMiddleware(promise(), thunk, logger());
const store = createStore(reducer, middleware);
// Step 2: dispatch function with one argument
// inside dispatch() is a handful of synchronous actions
// thunk() middleware allows us to do this
store.dispatch({
  // dispatch a fetch users action using axios
  type: "FETCH_USERS",
  // this api can generate an object of users/collection on demand
  // great for prototyping
  payload: axios.get("http://rest.learncode.academy/api/wstern/users")
});

// before using promise() from redux-promise-middleware:
// store.dispatch((dispatch) => {
//   dispatch({type: "FETCH_USERS_START"})
//   axios.get("http://rest.learncode.academy/api/wstern/users")
//     .then((response) => {
//       dispatch({type: "RECEIVE_USERS", payload: response.data})
//     })
//     .cach((err) => {
//       dispatch({type: "FETCH_USERS_ERROR", payload: err})
//     })
// });





import { applyMiddleware, createStore } from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
// import the combined reducer
import reducer from "./reducers";
// in store.js: store redux store, middleware, and the combined reducer
const middleware = applyMiddleware(promise(), thunk, logger());
// exporting redux store to be used by a component
export default createStore(reducer, middleware);

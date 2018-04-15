// Step 1: install redux and import createStore
import { createStore } from "redux";
// Step2: to create store you only need a reducer
// reducer takes state and an action as parameters
// reducer changes state based on action given
const reducer = (initialState = 0, action) => {
	if (action.type === "INC") {
		return initialState + 1;
	} else if (action.type === "DEC") {
		return initialState - 1;
	}
	return initialState;
};
// Step 3: create store
// store takes reducer and an object/state as parameters
const store = createStore(reducer, 1);
// Step 4: listen to store, we will know when something changes
store.subscribe(() => {
	console.log("store changed", store.getState());
});
// Step 5: send events to store
store.dispatch({ type: "INC" });
store.dispatch({ type: "INC" });
store.dispatch({ type: "INC" });
store.dispatch({ type: "DEC" });
store.dispatch({ type: "DEC" });
store.dispatch({ type: "DEC" });

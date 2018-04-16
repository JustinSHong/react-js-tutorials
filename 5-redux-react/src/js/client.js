import React from "react";
import ReactDOM from "react-dom";
// Step 1: import Provider
import { Provider } from "react-redux";

import Layout from "./components/Layout";
import store from "./store";

const app = document.getElementById("app");
// Step 2: wrap top level component with Provider
// Step 3: inject store as props into Provider
ReactDOM.render(
	<Provider store={store}>
		<Layout />
	</Provider>,
	app
);

import React from "react";

import { shallow } from "enzyme";
// import toJson from "enzyme-to-json";

import App from "./App";
import { Provider } from "react-redux";
import store from ".//redux/store";

let wrapped = shallow(
    <Provider store={store}>
        <App />
    </Provider>
);
describe("App", () => {
    it("should render App component correctly", () => {
        expect(wrapped).toMatchSnapshot();
    });
    // it("should have a title", () => {
    //     expect(wrapped.find("h1").text()).toEqual("hello World");
    // });
});

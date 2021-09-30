import React from "react";

import { shallow } from "enzyme";
// import toJson from "enzyme-to-json";

import Registration from "./Registration";
import { Provider } from "react-redux";
import store from "../../redux/store";

let wrapped = shallow(
    <Provider store={store}>
        <Registration />
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

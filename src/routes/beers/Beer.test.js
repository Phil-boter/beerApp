import React from "react";

import { shallow } from "enzyme";
// import toJson from "enzyme-to-json";

import Beer from "./Beer";
import { Provider } from "react-redux";
import store from "../../redux/store";

let wrapped = shallow(
    <Provider store={store}>
        <Beer />
    </Provider>
);
describe("App", () => {
    it("should render App component correctly", () => {
        expect(wrapped).toMatchSnapshot();
    });
    it("should have a title", () => {
        const wrapper = shallow(<h1>BeerComponent</h1>);
        expect(wrapper.text()).toEqual("BeerComponent");
    });
    it("should have a ul list", () => {
        const wrapper = shallow(<ul></ul>);
        expect(wrapper.containsMatchingElement(<ul></ul>)).toEqual(true);
    });
});

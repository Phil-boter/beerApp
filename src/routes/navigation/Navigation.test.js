import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import store from "../../redux/store";

import Navigation from "./Navigation";

let wrapped = shallow(
    <Provider store={store}>
        <Navigation />
    </Provider>
);
describe("App", () => {
    it("should render Beer component correctly", () => {
        expect(wrapped).toMatchSnapshot();
    });
    it("should have a title", () => {
        const wrapper = shallow(
            <div>
                <a href="/">BEERAPP</a>
            </div>
        );
        expect(wrapper.text().includes("BEERAPP")).toBe(true);
    });
    it("should have a ul list", () => {
        const wrapper = shallow(<ul></ul>);
        expect(wrapper.containsMatchingElement(<ul></ul>)).toEqual(true);
    });
});

import React from "react";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import store from "../../redux/store";

import Navigation from "./Navigation";

let wrapped = shallow(
    <Provider store={store}>
        <Navigation />
    </Provider>
);
describe("App", () => {
    it("should render Navigation component correctly", () => {
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
    it("should show signOUT link when logged in", () => {
        const local = { isLoggedIn: true };
        const wrapper = shallow(<Navigation local={local}></Navigation>);
        expect(wrapper.text().includes("SignOUT")).toBe(true);
    });
    it("should show signIN link when NOT logged in", () => {
        const local = { isLoggedIn: false };
        const wrapper = shallow(<Navigation local={local}></Navigation>);
        expect(wrapper.text().includes("SignIN")).toBe(true);
    });
});

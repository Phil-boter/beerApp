import React from "react";

import { shallow } from "enzyme";
// import toJson from "enzyme-to-json";

import Hop from "./Hop";
import { Provider } from "react-redux";
import store from "../../redux/store";

let wrapped = shallow(
    <Provider store={store}>
        <Hop />
    </Provider>
);
describe("App", () => {
    it("should render App component correctly", () => {
        expect(wrapped).toMatchSnapshot();
    });
    it("should have a table with title bitterhoips", () => {
        const wrapper = shallow(<h2>Bitterhops</h2>);
        expect(wrapper.text()).toEqual("Bitterhops");
    });
    it("should have a table with title aromahopos", () => {
        const wrapper = shallow(<h2>Aromahops</h2>);
        expect(wrapper.text()).toEqual("Aromahops");
    });
    it("should have a table for bitterhops", () => {
        const wrapper = shallow(
            <tr>
                <td></td>
                <td></td>

                <td></td>
                <td></td>
                <td>
                    <p></p>
                </td>
            </tr>
        );
        expect(
            wrapper.contains(
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <p></p>
                    </td>
                </tr>
            )
        ).toEqual(true);
    });
});

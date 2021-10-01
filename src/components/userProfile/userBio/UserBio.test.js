import React from "react";

import { shallow, fireEvent, mount } from "enzyme";
// import toJson from "enzyme-to-json";

import UserBio from "./UserBio";
import { Provider } from "react-redux";
import store from "../../../redux/store";

let wrapped = shallow(
    <Provider store={store}>
        <UserBio />
    </Provider>
);
describe("UserBio", () => {
    it("should render Bio component correctly", () => {
        expect(wrapped).toMatchSnapshot();
    });
});

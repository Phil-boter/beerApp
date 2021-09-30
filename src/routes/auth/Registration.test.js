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
    const input = {
        email: "test@test.com",
        password: "1234",
        first_name: "John",
        last_name: "Doe",
    };
    it("should render Registration component correctly", () => {
        expect(wrapped).toMatchSnapshot();
    });
    it("should have an input with value email", () => {
        const email = shallow(
            <div>
                <input type="text" name="email"></input>
            </div>
        );
        email.value = input.email;
        expect(email.value).toEqual("test@test.com");
    });
    it("should have an input with value password", () => {
        const password = shallow(
            <div>
                <input type="password" name="password"></input>
            </div>
        );
        password.value = input.password;
        expect(password.value).toEqual("1234");
    });
    it("should have an input with value for first name", () => {
        const first = shallow(
            <div>
                <input type="text" name="first"></input>
            </div>
        );
        first.value = input.first_name;
        expect(first.value).toEqual("John");
    });
    it("should have an input with value for last name", () => {
        const last = shallow(
            <div>
                <input type="Text" name="last"></input>
            </div>
        );
        last.value = input.last_name;
        expect(last.value).toEqual("Doe");
    });
});

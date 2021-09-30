import React from "react";

import { shallow } from "enzyme";
// import toJson from "enzyme-to-json";

import Login from "./Login";
import { Provider } from "react-redux";
import store from "../../redux/store";

let wrapped = shallow(
    <Provider store={store}>
        <Login />
    </Provider>
);
describe("App", () => {
    const input = { email: "test@test.com", password: "1234" };
    it("should render Loginu component correctly", () => {
        expect(wrapped).toMatchSnapshot();
    });
    it("should have an input with value email", () => {
        const email = shallow(
            <div>
                <input
                    type="text"
                    name="email"
                    autoComplete="email"
                    placeholder="Email"
                ></input>
            </div>
        );
        email.value = input.email;
        expect(email.value).toEqual("test@test.com");
    });
    it("should have an input with value password", () => {
        const password = shallow(
            <div>
                <input
                    type="password"
                    name="password"
                    autoComplete="password"
                    placeholder="Password"
                ></input>
            </div>
        );
        password.value = input.password;
        expect(password.value).toEqual("1234");
    });
});

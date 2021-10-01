import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import store from "../../../redux/store";
import { render, fireEvent } from "@testing-library/react";

import UserProfilePicture from "./UserProfilePicture";

const wrapper = shallow(
    <Provider store={store}>
        <UserProfilePicture />
    </Provider>
);
const user = {
    user: { first_name: "foo", last_name: "bar", image: "hello" },
};
describe("UserProfilePic", () => {
    it("should render UserProfilePicture component correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });
    it("When first and last props are passed, first and last are assigned the value of the alt attribute", () => {
        const { container } = render(<UserProfilePicture user={user} />);

        expect(container.querySelector("img").alt).toBe("foo bar");
    });
    test("When no url is passed a placeholder is used as src.", () => {
        const { container } = render(<UserProfilePicture user={null} />);

        expect(
            container.querySelector("img").src.endsWith("/assets/dolde2.png")
        ).toBe(true);
    });
});

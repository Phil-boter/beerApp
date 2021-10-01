import React from "react";

import { shallow } from "enzyme";
// import toJson from "enzyme-to-json";

import UserProfilePictureUpload from "./UserProfilePicUpload";
import { Provider } from "react-redux";
import store from "../../../redux/store";

let wrapped = shallow(
    <Provider store={store}>
        <UserProfilePictureUpload />
    </Provider>
);
describe("UserProfilePicUpload", () => {
    it("should render UserProfilePicUpload component correctly", () => {
        expect(wrapped).toMatchSnapshot();
    });
    it("should have an upload button", () => {
        const button = shallow(<button>Upload</button>);
        expect(button.text()).toEqual("Upload");
    });
});

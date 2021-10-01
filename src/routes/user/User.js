import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserBio from "../../components/userProfile/userBio/UserBio";
import UserProfilePic from "../../components/userProfile/userProfilePicture/UserProfilePicture";
import UserProfilePicUpload from "../../components/userProfile/userProfilePicUpload/UserProfilePicUpload";

import { getUser } from "../../redux/actions/userActions";

export default function User({ auth, local }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => {
        return state.user;
    });

    const [visible, setIsVisible] = useState(false);

    if (user.userId === null) {
        // console.log(user.userId);
        // console.log("auth", auth.userId);
        // console.log("local", local.userId);
        dispatch(getUser(local.userId));
        return <p>Loading</p>;
    }

    const toggleUploader = () => {
        setIsVisible(!visible);
    };

    return (
        <div className="user-container">
            <>
                <h1>hello {user.user.first_name}</h1>
                <UserBio user={user} />
                <UserProfilePicUpload
                    user={user}
                    setIsVisible={setIsVisible}
                    toggleUploader={toggleUploader}
                    visible={visible}
                />
                <UserProfilePic
                    user={user}
                    setIsVisible={setIsVisible}
                    toggleUploader={toggleUploader}
                    visible={visible}
                />
            </>
        </div>
    );
}

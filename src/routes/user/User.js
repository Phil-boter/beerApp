import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserBio from "../../components/userProfile/UserBio";
import UserProfilePic from "../../components/userProfile/UserProfilePicture";
import UserProfilePicUpload from "../../components/userProfile/UserProfilePicUpload";

import { getUser } from "../../redux/actions/userActions";

export default function User() {
    const dispatch = useDispatch();
    const user = useSelector((state) => {
        return state.user;
    });

    const [visible, setIsVisible] = useState(false);

    if (user.user === undefined) {
        dispatch(getUser(user.userId));
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

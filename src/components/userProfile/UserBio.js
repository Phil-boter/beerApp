import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../axios";
import { updateBio } from "../../redux/actions/userActions";

export default function UserBio({ user }) {
    const dispatch = useDispatch();

    const [visible, setIsVisible] = useState(false);
    const [bio, setBio] = useState("");

    const handleChange = (e) => {
        setBio(e.target.value);
    };

    const editBio = () => {
        setIsVisible(true);
    };

    const uploadBio = () => {
        console.log("click uploadBio");
        console.log("bio for uploadBio", bio, user.userId);
        dispatch(updateBio(bio, user.userId));
        setIsVisible(false);
        setBio("");
    };

    const renderEditor = () => {
        console.log("state textarea", visible);
        if (!visible) {
            if (user.user.bio) {
                return (
                    <div>
                        <h2>About me</h2>
                        {user.user.bio}
                        <button
                            className="edit-button"
                            onClick={() => editBio()}
                            data-testid="edit-button"
                        >
                            Edit
                        </button>
                    </div>
                );
            } else {
                return (
                    <div>
                        <p>Tell us something about yourself</p>
                        <button
                            className="edit-button"
                            data-testid="upload-button"
                            onClick={() => editBio()}
                        >
                            Add your bio now
                        </button>
                    </div>
                );
            }
        } else {
            return (
                <div>
                    <textarea
                        className="bio-textarea"
                        onChange={(e) => handleChange(e)}
                        defaultValue={bio}
                        placeholder="write something here"
                    />
                    <button
                        className="upload-button"
                        data-testid="upload-button"
                        onClick={() => uploadBio()}
                    >
                        Upload
                    </button>
                </div>
            );
        }
    };

    useEffect(() => {
        renderEditor();
    }, [user, dispatch]);

    return <>{renderEditor()}</>;
}

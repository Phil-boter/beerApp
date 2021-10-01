import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBio } from "../../../redux/actions/userActions";

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
        dispatch(updateBio(bio, user.userId));
        setIsVisible(false);
        setBio("");
    };

    const renderEditor = () => {
        if (!visible) {
            if (user.user.bio) {
                return (
                    <div>
                        <h2>About me</h2>
                        {user.user.bio}
                        <button
                            className="edit-button"
                            onClick={() => editBio()}
                            data-testid="edit"
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
                            data-testid="add"
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

    return <>{renderEditor()}</>;
}

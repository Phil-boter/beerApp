import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadProfilePic } from "../../../redux/actions/userActions";

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

const storage = getStorage();

export default function UserProfilePicUpload({
    user,
    visible,
    toggleUploader,
}) {
    const dispatch = useDispatch();

    const [image, setImage] = useState({});
    const [error, setError] = useState(false);

    const handleFileChange = (e) => {
        e.preventDefault();
        let fileInput = document.getElementById("file");
        const image = fileInput.files[0];
        image["id"] = Math.random();
        setImage(image);
    };

    const handleImageUpload = async (e) => {
        let url = "";
        e.preventDefault();
        const storageRef = ref(storage, "images/" + image.id);
        const uploadTask = uploadBytesResumable(storageRef, image);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                // eslint-disable-next-line default-case
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                }
            },
            (error) => {
                setError(true);
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    url = downloadURL;
                    dispatch(uploadProfilePic(url, user.userId));
                });
            }
        );
        resetForm(e);
    };

    const resetForm = (e) => {
        e.preventDefault();
        document.getElementById("upload-form").reset();
        console.log("reset");
        setImage({});
        toggleUploader(e);
    };

    return (
        <>
            {visible === true ? (
                <div className="uploader">
                    <h4 onClick={(e) => toggleUploader(e)} className="closeBtn">
                        X
                    </h4>
                    <form id="upload-form" method="POST" autoComplete="off">
                        <input
                            onChange={(e) => handleFileChange(e)}
                            type="file"
                            name="file"
                            id="file"
                            accept="image/*"
                        ></input>
                        <button onClick={(e) => handleImageUpload(e)}>
                            Upload
                        </button>
                    </form>
                </div>
            ) : null}
            {error && error === true ? (
                <p>Sorry that didn't work! Please try again later!</p>
            ) : null}
        </>
    );
}

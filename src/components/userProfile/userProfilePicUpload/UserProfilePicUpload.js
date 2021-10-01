import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadProfilePic } from "../../../redux/actions/userActions";

import "./style.css";

// -------Inintializing fireBase--------------
import app from "../../../Firebase/config";
// -------Inintializing fireBase--------------
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

const storage = getStorage();

function ProgressBar({ width, percent }) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(percent * width);
    }, [value, setValue, width, percent]);

    return (
        <div>
            <div className="progress-div" style={{ width: width }}>
                <div style={{ width: `${value}px` }} className="progress" />
            </div>
        </div>
    );
}

export default function UserProfilePicUpload({
    user,
    visible,
    toggleUploader,
    setIsVisible,
}) {
    const dispatch = useDispatch();

    let [image, setImage] = useState({});
    const [error, setError] = useState({
        error: false,
        message: "That didn't work!",
    });
    const [percent, setProgress] = useState(0);

    const handleFileChange = (e) => {
        e.preventDefault();
        let fileInput = document.getElementById("file");
        const pic = fileInput.files[0];
        pic["id"] = Math.random();
        setImage(pic);
    };

    const handleImageUpload = async (e) => {
        console.log("image", image);

        e.preventDefault();
        if (!image.name) {
            console.log("no image");
            setError({ error: true, message: "please select an image" });
            setTimeout(() => {
                setError(false);
            }, 2000);
            return;
        }

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
                setProgress(progress);
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
                    dispatch(uploadProfilePic(downloadURL, user.userId));
                });
                resetForm(e);
            }
        );
    };

    const resetForm = (e) => {
        e.preventDefault();
        document.getElementById("upload-form").reset();
        console.log("reset");

        setTimeout(() => {
            setProgress(0);
            toggleUploader();
        }, 1500);
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
                        <button
                            onClick={(e) => handleImageUpload(e)}
                            disabled={image === {}}
                        >
                            Upload
                        </button>
                        <ProgressBar width={400} percent={percent} />
                    </form>
                </div>
            ) : null}

            {error && error.error === true ? <p>{error.message}</p> : null}
        </>
    );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import userApi from "../api/UserApi";
import { useDispatch, useSelector } from "react-redux";
import { deposit } from "../redux/slices/depositSlice";
import SavingTotal from "./user/SavingTotal";

function Test() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const handleFileChange = e => {
        const selected = e.target.files[0];
        setFile(selected);
        setPreview(URL.createObjectURL(selected)); // tạo URL tạm để preview
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("avatarUrl", file);

        const res = await userApi.updateProfile(formData);
        console.log(res);

        setImageUrl(res.data); // đường dẫn từ server
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {preview && (
                <div>
                    <p>Xem trước:</p>
                    <img src={preview} alt="preview" width="200" />
                </div>
            )}
            <button onClick={handleUpload}>Upload</button>

            {imageUrl && (
                <div>
                    <p>Đã upload:</p>
                    <img src={`./${imageUrl}`} alt="uploaded" width="200" />
                </div>
            )}
        </div>
    );


}
export default Test;

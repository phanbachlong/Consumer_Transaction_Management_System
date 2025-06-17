import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProfileContent from "./ProfileContent";

const Profile = () => {


    return (
        <div className="flex flex-col h-screen">
            <ProfileContent></ProfileContent>
        </div>
    )
}

export default Profile;
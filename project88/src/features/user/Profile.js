import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProfileContent from "./ProfileContent";

const Profile = () => {


    return (
        <div className="flex flex-col h-screen">
            <Header></Header>
            <ProfileContent></ProfileContent>
            <Footer></Footer>
        </div>
    )
}

export default Profile;
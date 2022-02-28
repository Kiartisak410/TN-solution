import React from "react";
import {Link} from "react-router-dom";
import User from "../img/user2.png"

const UserImg = () => <img src={User} alt="" />;
const NameTag = () => {
    return(
        <>
            <div className="name-dis">
                <h2>สวัสดี</h2>
                <h3>Admin</h3>
            </div>
        </>
    )
}

const Admenu = () =>{
    return (
        <>
            <div className="top-img">
                <UserImg />
                <NameTag />
            </div>
        </>
    )
}

export default Admenu
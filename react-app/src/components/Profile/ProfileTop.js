import React, {useState} from "react";

import './ProfileTop.css'



const ProfileTop = () => {

    const [userInfo, setUserInfo] = useState({
        "img": "https://cdn.landesa.org/wp-content/uploads/default-user-image.png",
        "username": "Loading...",
        "firstname": "",
        "lastname": ""
    })

    const getUser = async (dispatch) => {
        
    }



    return (
        <>
        <div className="profile-container">
            <img className="avatar" src={userInfo.img} />

            <div className="info-container">
                <div>

                    {userInfo.username}
                </div>
                <div>
                    {userInfo.firstname} {userInfo.lastname}
                </div>

            </div>
        </div>
        </>
    )
}


export default ProfileTop

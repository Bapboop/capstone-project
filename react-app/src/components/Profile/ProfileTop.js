import React, { useEffect, useState } from "react";

import "./ProfileTop.css";

const ProfileTop = ({ userId }) => {
  const [user, setUser] = useState({});
  console.log(user, "Hello, mic test 12");

  useEffect(async () => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const theUser = await response.json();
      setUser(theUser);
    })();
  }, [userId]);

  return (
    <>
      <div className="profile-container">
        <img
          className="avatar"
          src={
            user?.photo_url
              ? user?.photo_url
              : "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
          }
        />

        <div className="info-container">
          <div>{user?.username ? user?.username : "No user could be found"}</div>
          <div>
            {user?.first_name} {user?.last_name}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTop;

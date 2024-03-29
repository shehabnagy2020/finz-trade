import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "appRedux/actions/Auth";
import { Link } from "react-router-dom";
import { CDN } from "../../constants/API";
import IntlMessages from "../../util/IntlMessages";
import NoProfileImg from "assets/images/noProfile.jpg";

const UserInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.userInfo);

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>
        <Link className="gx-text-black-grey" to={`/my-profile`}>
          <IntlMessages id="myAccount" />
        </Link>
      </li>
      <li onClick={() => dispatch(userSignOut())}>
        <IntlMessages id="logout" />
      </li>
    </ul>
  );

  return (
    <Popover
      overlayClassName="gx-popover-horizantal"
      placement="bottomRight"
      content={userMenuOptions}
      trigger="hover"
    >
      <Avatar
        src={user.pic ? CDN + user.pic : NoProfileImg}
        className="gx-avatar gx-pointer"
        alt=""
      />
    </Popover>
  );
};

export default UserInfo;

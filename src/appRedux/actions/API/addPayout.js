import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
  REDUX_PAYMENT_SOURCES,
} from "../../../constants/API";
import { getUserInfo } from "../Auth";
import { notification } from "antd";

const openNotificationSuccess = () => {
  notification["success"]({
    message: "Payout",
    description: "you have successfully added payout data",
  });
};
const openNotificationError = (msg) => {
  notification["error"]({
    message: "Broker",
    description: msg,
  });
};

export default (obj) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { addPayout: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/user/payout`,
      method: "POST",
      data: { ...obj },
      headers: {
        token: userToken,
      },
    });
    openNotificationSuccess();
    await dispatch(getUserInfo());
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addPayout: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { addPayout: false } });
    if (error.response && error.response.data) {
      openNotificationError(error.response.data.message);
      return;
    }
    openNotificationError("sorry failed to add payout data, try again");
  }
};

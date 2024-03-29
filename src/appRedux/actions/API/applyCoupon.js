import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_PAGE_ERRORS,
  REDUX_COUPON,
} from "../../../constants/API";
import { notification } from "antd";

const openNotificationError = (msg) => {
  notification["error"]({
    message: "Coupon Code",
    description: msg,
  });
};
const openNotificationSuccess = () => {
  notification["success"]({
    message: "Coupon Code",
    description:
      "You have successfully redeemed your coupon. Kindly click the selected plan below to enjoy your discount. Thank You",
  });
};

export default (name) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { applyCoupon: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/coupon/getInfo/${name}?lang=${
        getState().settings.locale.locale
      }&cb=${Date.now()}`,
      method: "GET",
      headers: {
        token: userToken,
      },
    });
    openNotificationSuccess();
    dispatch({ type: REDUX_COUPON, value: { ...res.data.data.coupon, name } });
    dispatch({ type: REDUX_PAGE_LOADERS, value: { applyCoupon: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { applyCoupon: false } });
    if (error.response && error.response.data)
      openNotificationError(error.response.data.message);
  }
};

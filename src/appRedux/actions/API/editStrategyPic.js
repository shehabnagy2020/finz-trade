import Axios from "axios";
import {
  REDUX_PAGE_LOADERS,
  API,
  REDUX_STRATEGIES,
} from "../../../constants/API";
import getStrategies from "./getStrategies";
import { notification } from "antd";

const openNotificationSuccess = () => {
  notification["success"]({
    message: "Strategies",
    description: "you have successfully edited strategy picture",
  });
};
const openNotificationError = (msg) => {
  notification["error"]({
    message: "Strategies",
    description: msg,
  });
};

export default (id, base64) => async (dispatch, getState) => {
  dispatch({
    type: REDUX_PAGE_LOADERS,
    value: { editStrategyPic: true },
  });
  const userToken = getState().auth.authUser;
  try {
    const res = await Axios({
      baseURL: API,
      url: `/strategy/uploadPic/${id}?lang=${
        getState().settings.locale.locale
      }`,
      method: "PUT",
      data: { base64 },
      headers: {
        token: userToken,
      },
    });
    await dispatch(getStrategies());
    openNotificationSuccess();
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editStrategyPic: false } });
  } catch (error) {
    console.log(error.response);
    dispatch({ type: REDUX_PAGE_LOADERS, value: { editStrategyPic: false } });
    if (error.response && error.response.data) {
      openNotificationError("Strategy Picture", error.response.data.message);
      return;
    }
    openNotificationError("Failed to change picture");
  }
};

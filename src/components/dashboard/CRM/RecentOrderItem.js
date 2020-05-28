import React from "react";

import Widget from "components/Widget/index";
import DisplayDate from "../../wall/DisplayDate";
import { Typography, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import getOrderSignals from "../../../appRedux/actions/API/getOrderSignals";
import IntlMessages from "../../../util/IntlMessages";

const RecentOrdersItem = ({ order }) => {
  const { Text } = Typography;

  const result = order.result;
  let formatedRes = result.split("@");
  const dispatch = useDispatch();
  const { pageLoaders } = useSelector(({ Api }) => Api);

  const cardColor =
    order.status === "win"
      ? "teal"
      : order.status === "lose"
      ? "red"
      : order.status === "execute"
      ? "orange"
      : "";

  const cardIcon =
    order.status === "win"
      ? "growth"
      : order.status === "lose"
      ? "down"
      : order.status === "execute"
      ? "menu-right"
      : "";
  return (
    <Spin spinning={pageLoaders.getOrderSignals === order._id || false}>
      <Widget styleName={`gx-card-full gx-p-3 gx-my-2`}>
        <div className="gx-media gx-justify-content-between gx-flex-nowrap">
          <div className="gx-flex-column">
            <div className="gx-media gx-align-items-center">
              <i
                className={`gx-mr-2 gx-mr-xxl-3 gx-text-${cardColor} icon icon-${cardIcon} gx-fs-xl`}
              />
              {order.result && (
                <Text className="">{`${
                  formatedRes[0]
                } ${formatedRes[1].toUpperCase()}`}</Text>
              )}
            </div>
            <Text strong className="gx-text-capitalize ">
              {order.market}
            </Text>
          </div>
          <div className="gx-flex-column">
            <Text className=" gx-fs-lg gx-mb-1" strong>
              {order.amount} LOT
            </Text>
            <Text className="gx-fs-sm">
              <DisplayDate date={order.executedIn} />
            </Text>
            <Text
              className="gx-link gx-fs-sm"
              onClick={(_) => dispatch(getOrderSignals(order))}
            >
              <IntlMessages id="showSignals" />
            </Text>
          </div>
        </div>
      </Widget>
    </Spin>
  );
};

export default RecentOrdersItem;

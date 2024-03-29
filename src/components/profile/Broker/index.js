import React, { useState } from "react";
import Widget from "components/Widget";
import { Typography, Button, Popconfirm, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import deleteBroker from "../../../appRedux/actions/API/deleteBroker";
import getBrokerFile from "../../../appRedux/actions/API/getBrokerFile";
import BrokerModal from "./BrokerModal";
import IntlMessages from "../../../util/IntlMessages";

const { Text } = Typography;
const openNotificationError = (msg) => {
  notification["error"]({
    message: "Broker",
    description: "Maximum number of brokers to add is reached",
  });
};

const Broker = () => {
  const { brokers, pageLoaders } = useSelector(({ Api }) => Api);
  const { userInfo } = useSelector(({ auth }) => auth);

  const [isVisible, setIsVisible] = useState(false);

  const dispatch = useDispatch();
  console.log(brokers, userInfo);

  const handleAdd = (_) => {
    if (brokers.length >= userInfo.plan.maxBrokersHave) {
      openNotificationError();
      return;
    }
    setIsVisible(true);
  };

  return (
    <Widget styleName="gx-card-profile-sm">
      <div className="gx-d-flex gx-align-items-center gx-justify-content-between gx-mb-3">
        <Text className="gx-fs-xl">
          <IntlMessages id="broker" />
        </Text>
        {userInfo.plan.name && (
          <div className="gx-d-flex">
            <Button shape="circle" icon="plus" onClick={handleAdd} />
            <Button
              shape="circle"
              icon="download"
              loading={pageLoaders.getBrokerFile}
              onClick={(_) => dispatch(getBrokerFile())}
            />
          </div>
        )}
      </div>
      {brokers.length >= 1 ? (
        brokers.map((data, index) => (
          <div
            className="gx-d-flex gx-justify-content-between gx-align-items-center"
            key={index}
          >
            <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
              <div className="gx-mr-3 gx-flex-column gx-justify-content-center gx-align-items-center">
                <i
                  className={`gx-fs-xxl gx-d-flex icon ${
                    data.company
                      ? "icon-check-cricle gx-text-green"
                      : "icon-error gx-text-orange"
                  }`}
                />
                <span className="gx-text-grey gx-fs-sm">
                  {data.live ? "Live" : "Demo"}
                </span>
              </div>
              <div className="gx-media-body gx-flex-column">
                {/* <span className="gx-mb-0 gx-text-grey gx-fs-sm">{data.id}</span> */}
                <span className="gx-mb-0 gx-text-grey gx-fs-sm">
                  {data.company}
                </span>
                <p className="gx-mb-0">{data.id}</p>
                <p className="gx-mb-0">{data.name}</p>
              </div>
            </div>
            <Popconfirm
              title="Are you sure you'd like to delete this broker ?"
              onConfirm={(_) => dispatch(deleteBroker(data._id))}
            >
              <Button
                icon="delete"
                shape="circle"
                loading={pageLoaders.deleteBroker === data._id}
              />
            </Popconfirm>
          </div>
        ))
      ) : (
        <div className="gx-text-center gx-mt-3 gx-flex-column">
          <Text className="gx-text-orange gx-fs-lg">
            <IntlMessages id="noBroker" />
          </Text>
          <a
            href="https://finztrade.com/finztrade-integration.pdf"
            target="_blank"
            className="gx-mt-2"
          >
            <Text className="gx-text-purple gx-fs-lg">
              <IntlMessages id="brokerTutorial" />
            </Text>
          </a>
        </div>
      )}
      <BrokerModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </Widget>
  );
};

export default Broker;

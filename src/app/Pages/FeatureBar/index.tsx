import React from "react";
import { Typography } from "antd";
import {
    ClockCircleOutlined,
    PercentageOutlined,
    UserSwitchOutlined,
    CustomerServiceOutlined
} from '@ant-design/icons';
import styles from "./index.module.css";
import MobileFeatureSection from "../MobileFeatureSection";
import TravelIcon from "../TravelIcon";

const features = [
    {
        icon: <ClockCircleOutlined className={styles["feature-icon"]} />,
        title: "Call Answered in 5 Seconds",
        desc: "Your calls answered by leading travel experts in under 5 seconds."
    },
    {
        icon: <PercentageOutlined className={styles["feature-icon"]} />,
        title: "Up to 40% Off",
        desc: "Unpublished offers and great discounts when you book on-call."
    },
    {
        icon: <UserSwitchOutlined className={styles["feature-icon"]} />,
        title: "Expert Advice",
        desc: "Hand-crafted travel itinerary that meet all your travel preferences."
    },
    {
        icon: <CustomerServiceOutlined className={styles["feature-icon"]} />,
        title: "Best Customer Service",
        desc: "Round-the-clock customer service to get all your doubts clarified."
    }
];

const FeatureBar = () => (
    <>
        <div className={styles["feature-bar"]}>
            <TravelIcon />

            <div className={styles["feature-bar-2row"]}>
                {features.map((f, i) => (
                    <div className={styles["feature-block"]} key={i}>
                        {f.icon}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography.Title level={5} className={styles["feature-title"]}>{f.title}</Typography.Title>
                            <Typography.Text className={styles["feature-desc"]}>{f.desc}</Typography.Text>
                        </div>
                    </div>
                ))}
            </div>

            <MobileFeatureSection />
        </div>

        <div className={styles["feature-bar-1"]}>
            <div className={styles["feature-bar-2row"]}>
                {features.map((f, i) => (
                    <div className={styles["feature-block"]} key={i}>
                        {f.icon}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography.Title level={5} className={styles["feature-title"]}>{f.title}</Typography.Title>
                            <Typography.Text className={styles["feature-desc"]}>{f.desc}</Typography.Text>
                        </div>
                    </div>
                ))}
            </div>
            <TravelIcon />

            <MobileFeatureSection />
        </div>
    </>
);

export default FeatureBar; 
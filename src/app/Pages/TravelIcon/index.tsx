import React from "react";
import styles from "./index.module.css";
import { Typography } from "antd";
import {
    SecurityScanOutlined, SecurityScanFilled,
    SafetyOutlined,
    SafetyCertificateFilled,
    CustomerServiceFilled
} from '@ant-design/icons';

const TravelIcon = () => {
    return (
        <div className={styles["feature-bar"]}>
            <div className={styles["feature-item"]}>
                <SecurityScanFilled className={styles["icon"]} style={{ color: "white" }} />
                <Typography.Text style={{ color: 'white', fontSize: 12 }}>Privacy Compliance</Typography.Text>
            </div>

            <div className={styles["divider"]}></div>

            <div className={styles["feature-item"]}>
                <SafetyCertificateFilled className={styles["icon"]} style={{ color: "white" }} />
                <Typography.Text style={{ color: 'white', fontSize: 12 }}>Secure Travel</Typography.Text>
            </div>

            <div className={styles["divider"]}></div>

            <div className={styles["feature-item"]}>
                <Typography.Text style={{ color: 'white', fontSize: 12 }}><span style={{ fontWeight: 'bold' }}>45K+</span> Travelers Trust</Typography.Text>
            </div>

            <div className={styles["divider"]}></div>

            <div className={styles["feature-item"]}>
                <CustomerServiceFilled className={styles["icon"]} style={{ color: "white" }} />
                <Typography.Text style={{ color: 'white', fontSize: 12 }}>24x7 CUSTOMER <br /> SERVICE SUPPORT</Typography.Text>
            </div>
        </div>
    );
};

export default TravelIcon; 
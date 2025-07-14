import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import {
    PhoneOutlined
} from '@ant-design/icons';

const BottomCallBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Initial checks
        checkIsMobile();
        handleScroll();

        // Event listeners
        window.addEventListener("resize", checkIsMobile);
        window.addEventListener("scroll", handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener("resize", checkIsMobile);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (!isMobile || !isVisible) return null;

    return (
        <div className={styles["call-banner"]}>
            <div className={styles["left-section"]}>
                <img
                    src="/airplane1.jpeg"
                    alt="Support"
                    className={styles["icon"]}
                />
                <div className={styles["text-group"]}>
                    <div className={styles["offer-text"]}>Call & Get upto 40% OFF</div>
                    <div className={styles["phone-number"]}>1-800-XXX-XXXX</div>
                </div>
            </div>
            <div
                className={styles["call-icon"]}
                onClick={() => window.open("tel:9999999999")}
            >
                <PhoneOutlined />
            </div>
        </div>
    );
};

export default BottomCallBanner;

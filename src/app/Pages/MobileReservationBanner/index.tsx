import { PhoneFilled } from "@ant-design/icons";
import { Button, Typography } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

const MobileReservationBanner = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!isMobile) return null;

    return (
        <div className={styles["mobile-res-banner"]}>
            {/* Title bar */}
            <div className={styles["mobile-res-titlebar"]}>
                Airlines Phone Number Reservation
            </div>
            {/* Staff image */}
            <div className={styles["mobile-res-staff-img"]}>
                <Image src="/airplane.jpg" alt="Staff" width={400} height={220} style={{ width: '100%', borderRadius: 8 }} />
            </div>
            {/* Booking button */}
            <div className={styles["mobile-res-book-btn"]}>
                <Button type="primary" style={{ background: '#223A5F', borderRadius: 30, fontWeight: 600, fontSize: 18, width: '100%' }}>
                    Booking, Changes & Cancellation
                </Button>
            </div>
            {/* Call to action */}
            <Typography.Text className={styles["mobile-res-cta-label"]}>
                No Hold  Call Answered In 5 Sec
            </Typography.Text>
            <div className={styles["mobile-res-cta"]}>
                <div
                    onClick={() => window.open("tel:9999999999")}
                    className={styles["mobile-res-cta-phone"]}>
                    <PhoneFilled style={{ fontSize: 32, color: '#fff', marginRight: 10 }} />
                    <span className={styles["mobile-res-cta-number"]}>1-800-XXX-XXXX</span>
                </div>
            </div>
            <div className={styles["mobile-res-helpline"]}>24/7 Helpline</div>
        </div>
    );
};

export default MobileReservationBanner; 
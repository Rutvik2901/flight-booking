import React, { useState, useEffect } from "react";
import { Menu, Drawer, Button } from "antd";
import { CustomerServiceOutlined, MenuOutlined, PhoneFilled } from "@ant-design/icons";
import styles from "./index.module.css";

const items = [
    { key: "home", label: "Home" },
    { key: "bookings", label: "Bookings" },
    { key: "support", label: "Support" },
];

const CALL_NUMBER = "1-800-123-4567";

const AntdMenu = () => {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const CallCta = (
        <div className={styles["menu-call-cta"]}>
            <div className={styles["menu-call-cta-left"]}>
                <div
                    onClick={() => window.open("tel:9999999999")}

                    className={styles["menu-call-cta-texts"]}>
                    <span className={styles["menu-call-cta-label"]}>CALL US ON</span>
                    <span className={styles["menu-call-cta-number"]}>{CALL_NUMBER}</span>
                </div>
            </div>

            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#f3830d', marginLeft: '-40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CustomerServiceOutlined className={styles["menu-call-cta-24"]} />
            </div>
        </div>
    );

    return (
        <nav className={styles["antd-menu-nav"]}>
            {/* Desktop: Menu and call-to-action */}
            <div className={styles["antd-menu-desktop"]}>
                <Menu id="menu" mode="horizontal" items={items} selectable={false} />
                <div className={styles["menu-call-cta-section"]}>{CallCta}</div>
            </div>
            {/* Mobile: Hamburger and call-to-action */}
            {isMobile && (
                <div className={styles["menu-call-cta-section-mobile"]}>{CallCta}</div>
            )}
            <div className={styles["antd-menu-mobile"]}>
                <Button
                    type="text"
                    icon={<MenuOutlined style={{ fontSize: 24 }} />}
                    onClick={() => setOpen(true)}
                    className={styles["antd-menu-hamburger"]}
                />
                <Drawer
                    title="Menu"
                    placement="right"
                    onClose={() => setOpen(false)}
                    open={open}
                    width={200}
                >
                    <Menu mode="vertical" items={items} selectable={false} onClick={() => setOpen(false)} />
                </Drawer>
            </div>
        </nav>
    );
};

export default AntdMenu; 
import React from "react";
import { Typography, Input, Button, Space } from "antd";
import { MailOutlined, FacebookFilled, InstagramFilled, TwitterSquareFilled } from "@ant-design/icons";
import styles from "./index.module.css";

const FooterSection = () => (
    <footer className={styles["footer-section"]}>
        <div className={styles["footer-content"]}>
            <div className={styles["footer-col"] + " " + styles["footer-contact"]}>
                <Typography.Title level={5} className={styles["footer-heading"]}>Subscribe to Newsletter</Typography.Title>
                <Typography.Text className={styles["footer-newsletter-label"]}>Get exclusive discounts on flights & hotels</Typography.Text>
                <div className={styles["footer-newsletter"]}>
                    <Space.Compact style={{ width: '100%', marginTop: 8 }}>
                        <Input placeholder="Enter you email" />
                        <Button className={styles["footer-newsletter-btn"]} type="primary">Submit</Button>
                    </Space.Compact>
                </div>
                <div className={styles["footer-contact-info"]}>
                    <MailOutlined style={{ marginRight: 8, color: '#fff' }} />
                    <Typography.Text className={styles["footer-contact-email"]}>care@flightsmojo.com</Typography.Text>
                </div>
                <div className={styles["footer-social"]}>
                    <FacebookFilled className={styles["footer-social-icon"]} />
                    <InstagramFilled className={styles["footer-social-icon"]} />
                    <TwitterSquareFilled className={styles["footer-social-icon"]} />
                </div>
            </div>

            <div className={styles["footer-col"]}>
                <Typography.Text style={{ textDecoration: 'underline', color: 'white', letterSpacing: 2, fontWeight: 600, fontSize: 14 }}>IMPORTANT LINKS</Typography.Text>
                <ul className={styles["footer-list"]}>
                    <li>ABOUT US</li>
                    <li>FAQs</li>
                    <li>DISCLAIMER</li>
                    <li>CONTACT US</li>
                    <li>BAGGAGE POLICY</li>
                    <li>TRAVEL ADVISORY</li>
                    <li>SITE MAP</li>
                </ul>
            </div>

            <div className={styles["footer-col"]}>
                <Typography.Text style={{ textDecoration: 'underline', color: 'white', letterSpacing: 2, fontWeight: 600, fontSize: 14 }}>LEGEL</Typography.Text>
                <ul className={styles["footer-list"]}>
                    <li>TERMS & CONDITIONS</li>
                    <li>PRIVACY POLICY</li>
                    <li>PRICE MATCH POLICY</li>
                    <li>TAXES & FEES</li>
                    <li>POST TICKETING FEE</li>
                    <li>COOKIE POLICY</li>
                    <li>OUR SERVICE FEES</li>
                </ul>
            </div>

            <div className={styles["footer-col"]}>
                <Typography.Text style={{ textDecoration: 'underline', color: 'white', letterSpacing: 2, fontWeight: 600, fontSize: 14 }}>CONTACT US</Typography.Text>
                <ul className={styles["footer-list"]}>
                    <li>ABOUT US</li>
                    <li>FAQs</li>
                    <li>DISCLAIMER</li>
                    <li>CONTACT US</li>
                    <li>BAGGAGE POLICY</li>
                    <li>TRAVEL ADVISORY</li>
                    <li>SITE MAP</li>
                </ul>
            </div>
        </div>
        <div className={styles["footer-bg-illustration"]}></div>

        <div className={styles["footer-copyright"]}>
            FLIGHTSMOJO LLC its registered office located at 42292 BIRNAMWOOD PL, in the city of ASHBURN With Zip Code 20148 in the state of VIRGINIA, USA is accredited with ARC No. 49797602. We have met and we continue to maintain the rigorous financial, personnel and business standards as defined in ARC's Agent Reporting Agreement (ARA). We are available to provide customer support on all days from Monday to Sunday. Customer Service Number: 1-844-736-1666 | Email: care@flightsmojo.com
            <br />
            Copyright  a9 2015-2025 FLIGHTS MOJO LLC .all rights reserved | California: CASOT # 2136600-70
        </div>
    </footer>
);

export default FooterSection; 
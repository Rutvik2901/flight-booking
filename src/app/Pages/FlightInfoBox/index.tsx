import React from "react";
import { Typography } from "antd";
import styles from "./index.module.css";

const FlightInfoBox = () => (
    <div className={styles["flight-info-box"]}>
        <Typography.Title level={5} className={styles["flight-info-title"]}>
            Book Cheap Flight Tickets with us.
        </Typography.Title>
        <Typography.Paragraph className={styles["flight-info-paragraph"]}>
            Is a cheap plane ticket your first top concern? We provide pocket-friendly Cheap Flight deals to the world's chicest travel destinations. Let us know about your trip ideas and budget, whether it's a romantic holiday with your special someone or a family holiday with your loved ones. Our travel experts will devise a cost-effective solution for your dream vacation. Our best affordable fares will undoubtedly be impossible to resist. These discounts are backed by convenience search technology and deep expertise for some of the world's most desired locations. You can contact us for any queries about your travel arrangements or our Cheap Flights offers. Our travel agents will gladly provide you with the best available deals. Don't wait; book your Cheap Flight ticket with us!
        </Typography.Paragraph>
        <Typography.Title level={5} className={styles["flight-info-subheading"]}>
            Why should you book Cheap Flight tickets with us?
        </Typography.Title>
        <ul className={styles["flight-info-list"]}>
            <li>You may save money on airfare and cut down on your trip expenses</li>
            <li>Use our undisclosed discounts, which are exclusively available through our travel specialists.</li>
            <li>Our experts utilize various techniques to find the best-priced airfare on your Cheap flight, enabling you to save the most money.</li>
            <li>All our low-cost airline reservations come with a price match guarantee, which can help you save even more money on your flights.</li>
        </ul>
        <Typography.Title level={5} className={styles["flight-info-subheading"]}>
            Airlines on partenring offering Cheap Flight Tickets:
        </Typography.Title>
        <ul className={styles["flight-info-list"]}>
            <li>Frontier Airlines</li>
            <li>Spirit Airlines</li>
            <li>Sun Country Airlines</li>
            <li>JetBlue Airways</li>
            <li>Allegiant Air</li>
        </ul>
    </div>
);

export default FlightInfoBox; 
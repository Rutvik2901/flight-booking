import { CalendarOutlined, ClockCircleOutlined, CreditCardOutlined, StarOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { Typography } from "antd";

const cards = [
    { icon: <StarOutlined style={{ alignItems: 'flex-end', height: '100%', marginBottom: 16 }} />, text: "Expert Guidance By Our Travel experts" },
    { icon: <CalendarOutlined style={{ alignItems: 'flex-end', height: '100%', marginBottom: 16 }} />, text: "Immediate Booking confirmation" },
    { icon: <ClockCircleOutlined style={{ alignItems: 'flex-end', height: '100%', marginBottom: 16 }} />, text: "24-Hour Customer support" },
    { icon: <CreditCardOutlined style={{ alignItems: 'flex-end', height: '100%', marginBottom: 16 }} />, text: "Flexible Payment Plans" },
];

const MobileFeatureSection = () => (
    <section className={styles.mobileFeatureSection}>
        <div className={styles.cardsGrid}>
            {cards.map((c, i) => (
                <div className={styles.card} key={i}>
                    <div className={styles.cardIcon}>{c.icon}</div>
                    <Typography.Text className={styles.cardText}>{c.text}</Typography.Text>
                </div>
            ))}
        </div>
    </section>
);

export default MobileFeatureSection; 
"use client";

import { UpOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, message, Radio, RadioChangeEvent, Select, Typography } from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import AntdMenu from "../AntdMenu";
import BottomCallBanner from "../CallBannerBottom";
import FeatureBar from "../FeatureBar";
import FlightInfoBox from "../FlightInfoBox";
import FooterSection from "../FooterSection";
import MobileReservationBanner from "../MobileReservationBanner";
import styles from "./index.module.css";

interface AirportOption {
    iata_code: string;
    city: string;
    state: string;
    country: string;
    label?: string; // Optional for Select display
}

interface FormValues {
    tripType: string;
    from: AirportOption | null;
    to: AirportOption | null;
    departDate: Dayjs | null;
    returnDate: Dayjs | null;
    passengers: number;
    class: string;
    name: string;
    mobile: string;
}

interface MultiCitySegment {
    from: AirportOption | null;
    to: AirportOption | null;
    departDate: Dayjs | null;
}

interface FormFieldProps {
    name: string;
    label: string;
    rules: any[];
    children: React.ReactNode;
    className?: string;
}

// Reusable FormField component
const FormField: React.FC<FormFieldProps> = ({ name, label, rules, children, className }) => (
    <Form.Item
        name={name}
        label={label}
        rules={rules}
        className={className}
    >
        {children}
    </Form.Item>
);

export function HomePage() {
    const [form] = Form.useForm<FormValues>();
    const [departDate, setDepartDate] = useState<Dayjs | null>(null);
    const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
    const [selectedTripType, setSelectedTripType] = useState('roundtrip');
    const [messageApi, contextHolder] = message.useMessage();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [airportOptions, setAirportOptions] = useState<any[]>([]);
    const [loadingAirports, setLoadingAirports] = useState(false);
    const [multiCitySegments, setMultiCitySegments] = useState<MultiCitySegment[]>([
        { from: null, to: null, departDate: null }
    ]);

    // Fetch airport data once
    useEffect(() => {
        setLoadingAirports(true);
        fetch("https://raw.githubusercontent.com/algolia/datasets/master/airports/airports.json")
            .then(res => res.json())
            .then(data => {
                // Only keep airports with IATA code
                const filtered = data.filter((a: any) => a.iata_code && a.city && a.country);
                setAirportOptions(filtered);
            })
            .finally(() => setLoadingAirports(false));
    }, []);

    // Custom option renderer
    const renderAirportOption = (airport: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
                color: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: 12,
            }}>{airport.iata_code}</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: '#000', lineHeight: 1 }}>{airport.city}</span>
                <span style={{ color: '#000', fontSize: 14 }}>{airport.city.toUpperCase()},{airport.country.toUpperCase()}</span>
            </div>
        </div>
    );

    const tripTypeOptions: CheckboxGroupProps<string>['options'] = [
        { label: 'ROUND TRIP', value: 'roundtrip' },
        { label: 'ONE WAY', value: 'oneway' },
        { label: 'MULTI CITY', value: 'multicity' },
    ];

    const classOptions = [
        { value: 'Economy', label: 'Economy' },
        { value: 'Business', label: 'Business' },
        { value: 'First Class', label: 'First Class' },
    ];

    const handleTripTypeChange = (e: RadioChangeEvent) => {
        setSelectedTripType(e.target.value);
    };

    const handleDepartDateChange = (date: Dayjs | null) => {
        setDepartDate(date);
        form.setFieldsValue({ departDate: date });

        // Reset return date if it is before the new depart date
        if (returnDate && date && date.isAfter(returnDate, 'day')) {
            setReturnDate(null);
            form.setFieldsValue({ returnDate: null });
        }
    };

    const handleReturnDateChange = (date: Dayjs | null) => {
        setReturnDate(date);
        form.setFieldsValue({ returnDate: date });
    };

    const isDateDisabled = (current: Dayjs | null) => {
        if (!current) return false;
        const today = dayjs().startOf('day');
        return current < today;
    };

    const isReturnDateDisabled = (current: Dayjs | null) => {
        if (!current) return false;
        const today = dayjs().startOf('day');
        if (!departDate) {
            return current < today;
        }
        return current < today || current < departDate.startOf('day');
    };

    const handleAirportChange = (field: 'from' | 'to', value: string) => {
        const airport = airportOptions.find((a) => a.iata_code === value);
        if (airport) {
            console.log(airport);

            form.setFieldsValue({ [field]: airport });
        }
    };

    const handleAddSegment = () => {
        if (multiCitySegments.length < 3) {
            const prev = multiCitySegments[multiCitySegments.length - 1];
            setMultiCitySegments([
                ...multiCitySegments,
                {
                    from: prev.to || null,
                    to: null,
                    departDate: prev.departDate || null,
                },
            ]);
        }
    };
    // Remove a segment
    const handleRemoveSegment = (idx: number) => {
        setMultiCitySegments(multiCitySegments.filter((_, i) => i !== idx));
    };
    // Update a segment field
    const handleSegmentChange = (idx: number, field: keyof MultiCitySegment, value: any) => {
        const updated = [...multiCitySegments];
        updated[idx][field] = value;
        setMultiCitySegments(updated);
    };

    const formFields = useMemo(() => {
        return {
            tripType: {
                name: "tripType",
                label: "Trip Type",
                rules: [{ required: true, message: 'Please select trip type!' }],
                children: (
                    <Radio.Group
                        className={styles["radioButton"]}
                        value={selectedTripType}
                        onChange={handleTripTypeChange}
                        options={tripTypeOptions}
                    />
                )
            },
            from: {
                name: "from",
                label: "From",
                rules: [{ required: true, message: 'Please select departure airport!' }],
                className: styles["field-group"],
                children: (
                    <Select
                        variant="filled"
                        showSearch
                        placeholder="Airport/City Name"
                        loading={loadingAirports}
                        filterOption={(input, option) => {
                            const airport = option?.airport;
                            return (
                                airport.city.toLowerCase().includes(input.toLowerCase()) ||
                                airport.iata_code.toLowerCase().includes(input.toLowerCase()) ||
                                airport.country.toLowerCase().includes(input.toLowerCase())
                            );
                        }}
                        optionLabelProp="label"
                        styles={{
                            popup: {
                                root: {
                                    background: 'white',
                                    padding: 8,
                                    borderRadius: 8,
                                }
                            }
                        }}
                        popupRender={menu => <div style={{ background: 'white', borderRadius: 8 }}>{menu}</div>}
                        labelInValue
                    >
                        {airportOptions.map((airport) => (
                            <Select.Option
                                key={airport.iata_code + airport.city}
                                value={airport.iata_code}
                                label={`${airport.city}, ${airport.country}`}
                                airport={airport}
                            >
                                {renderAirportOption(airport)}
                            </Select.Option>
                        ))}
                    </Select>
                )
            },
            to: {
                name: "to",
                label: "To",
                rules: [{ required: true, message: 'Please select destination airport!' }],
                className: styles["field-group"],
                children: (
                    <Select
                        variant="filled"
                        showSearch
                        placeholder="Airport/City Name"
                        loading={loadingAirports}
                        filterOption={(input, option) => {
                            const airport = option?.airport;
                            return (
                                airport.city.toLowerCase().includes(input.toLowerCase()) ||
                                airport.iata_code.toLowerCase().includes(input.toLowerCase()) ||
                                airport.country.toLowerCase().includes(input.toLowerCase())
                            );
                        }}
                        optionLabelProp="label"
                        styles={{
                            popup: {
                                root: {
                                    background: 'white',
                                    padding: 8,
                                    borderRadius: 8,
                                }
                            }
                        }}
                        popupRender={menu => <div style={{ background: 'white', borderRadius: 8 }}>{menu}</div>}
                        labelInValue={true}
                    >
                        {airportOptions.map((airport) => (
                            <Select.Option
                                key={airport.iata_code + airport.city + 'to'}
                                value={airport.iata_code}
                                label={`${airport.city}, ${airport.country}`}
                                airport={airport}
                            >
                                {renderAirportOption(airport)}
                            </Select.Option>
                        ))}
                    </Select>
                )
            },
            departDate: {
                name: "departDate",
                label: "Depart",
                rules: [{ required: true, message: 'Please select departure date!' }],
                className: styles["field-group"],
                children: (
                    <DatePicker
                        value={departDate}
                        onChange={handleDepartDateChange}
                        disabledDate={isDateDisabled}
                        placeholder="Select"
                        variant="filled"
                    />
                )
            },
            returnDate: {
                name: "returnDate",
                label: "Return",
                rules: [
                    ({ getFieldValue }: any) => ({
                        required: getFieldValue('tripType') !== 'oneway',
                        message: 'Please select return date!',
                    }),
                    ({ getFieldValue }: any) => ({
                        validator(_: any, value: any) {
                            if (getFieldValue('tripType') === 'oneway') {
                                return Promise.resolve();
                            }
                            if (!value || !getFieldValue('departDate') || value.isAfter(getFieldValue('departDate'))) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Return date must be after departure date!'));
                        },
                    }),
                ],
                className: styles["field-group"],
                children: (
                    <DatePicker
                        value={returnDate}
                        onChange={handleReturnDateChange}
                        disabled={selectedTripType === 'oneway'}
                        disabledDate={isReturnDateDisabled}
                        placeholder="Select"
                        variant="filled"
                    />
                )
            },
            passengers: {
                name: "passengers",
                label: "Passengers",
                rules: [
                    { required: true, message: 'Please enter number of passengers!' },
                    { type: 'number', min: 1, max: 100, message: 'Passengers must be between 1 and 100!' }
                ],
                className: styles["field-group"],
                children: (
                    <InputNumber
                        variant="filled"
                    />
                )
            },
            class: {
                name: "class",
                label: "Class",
                rules: [{ required: true, message: 'Please select travel class!' }],
                className: styles["field-group"],
                children: (
                    <Select
                        placeholder="Select Class"
                        variant="filled"
                        style={{ flex: 1 }}
                        options={classOptions}
                    />
                )
            },
            name: {
                name: "name",
                label: "Name",
                rules: [
                    { required: true, message: 'Please enter your name!' },
                    { min: 2, message: 'Name must be at least 2 characters!' },
                    { pattern: /^[a-zA-Z\s]+$/, message: 'Name can only contain letters and spaces!' }
                ],
                className: styles["field-group"],
                children: (
                    <Input
                        style={{ color: 'rgba(0,0,0,0.88)' }}
                        placeholder="Enter name"
                        variant="filled"
                    />
                )
            },
            mobile: {
                name: "mobile",
                label: "Mobile number",
                rules: [
                    { required: true, message: 'Please enter mobile number!' },
                    { pattern: /^[0-9]{10,15}$/, message: 'Please enter a valid mobile number!' }
                ],
                className: styles["field-group"],
                children: (
                    <Input
                        style={{ color: 'rgba(0,0,0,0.88)' }}
                        placeholder="Enter mobile"
                        variant="filled"
                    />
                )
            }
        }
    }, [airportOptions, form]);

    useEffect(() => {
        if (showSuccessMessage) {
            messageApi.open({
                type: 'success',
                content: 'Form submitted successfully! Will contact you shortly with cheapest flight options',
            });
            setShowSuccessMessage(false);
        }
    }, [showSuccessMessage, messageApi]);

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.scrollY > 120);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleFormSubmit = async (values: FormValues) => {
        const formattedValues = {
            ...values,
            departDate: values.departDate ? dayjs(values.departDate).format("DD-MM-YYYY") : null,
            returnDate: values.returnDate ? dayjs(values.returnDate).format("DD-MM-YYYY") : null,
        };

        console.log(formattedValues);


        // Compose booking summary as message
        const messageSummary = `\nTrip Type: ${formattedValues.tripType}\nFrom: ${formattedValues.from?.label || ''}\nTo: ${formattedValues.to?.label || ''}\nDepart: ${formattedValues.departDate || ''}\nReturn: ${formattedValues.returnDate || ''}\nPassengers: ${formattedValues.passengers}\nClass: ${formattedValues.class}\nMobile: ${formattedValues.mobile}`;

        try {
            const res = await fetch("http://localhost:8000/sendMail.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formattedValues.name,
                    message: messageSummary
                })
            });
            const data = await res.json();
            if (data.success) {
                messageApi.open({
                    type: 'success',
                    content: 'Form submitted and email sent! Will contact you shortly with cheapest flight options',
                });
                // Clear the form after successful submission
                form.resetFields();
                setDepartDate(null);
                setReturnDate(null);
                setSelectedTripType('roundtrip');
            } else {
                messageApi.open({
                    type: 'error',
                    content: data.message || 'Email sending failed. Please try again.',
                });
            }
        } catch (err) {
            messageApi.open({
                type: 'error',
                content: 'Failed to send email. Please try again.',
            });
        }
    };

    const handleFormSubmitFailed = () => {
        message.error('Please fill all required fields correctly.');
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className={styles["main-bg"]}>
            {contextHolder}
            <AntdMenu />

            {/* Main Content */}
            <div className={styles["main-content"]}>
                <MobileReservationBanner />

                <div className={styles["flight-form-wrapper"]}>

                    <div className={styles["flight-form-container"]}>
                        <Form
                            form={form}
                            name="flightBookingForm"
                            onFinish={handleFormSubmit}
                            onFinishFailed={handleFormSubmitFailed}
                            className={styles["flight-form"]}
                            layout="vertical"
                            initialValues={{
                                tripType: 'roundtrip',
                                passengers: 1,
                                class: 'Economy'
                            }}
                        >
                            <div className={styles["header"]}>
                                <span>FLIGHTS</span>
                            </div>

                            {/* Trip Type Field */}
                            <FormField {...formFields.tripType} />

                            {/* Multi City UI */}
                            {selectedTripType === 'multicity' ? (
                                <div>
                                    {multiCitySegments.map((segment, idx) => (
                                        <div key={idx} className={styles["multiCity-segment"]}>
                                            <div className={styles["multiCity-fields-row"]}>
                                                <div className={styles["field-group"] + ' ' + styles["multiCity-field"]}>
                                                    <label>From</label>
                                                    <Select
                                                        variant="filled"
                                                        showSearch
                                                        placeholder="Airport/City Name"
                                                        value={segment.from?.iata_code}
                                                        onChange={val => handleSegmentChange(idx, 'from', airportOptions.find(a => a.iata_code === val) || null)}
                                                        filterOption={(input, option) => {
                                                            const airport = option?.airport;
                                                            return (
                                                                airport.city.toLowerCase().includes(input.toLowerCase()) ||
                                                                airport.iata_code.toLowerCase().includes(input.toLowerCase()) ||
                                                                airport.country.toLowerCase().includes(input.toLowerCase())
                                                            );
                                                        }}
                                                        optionLabelProp="label"
                                                        labelInValue
                                                        styles={{
                                                            popup: {
                                                                root: {
                                                                    background: 'white',
                                                                    padding: 8,
                                                                    borderRadius: 8,
                                                                }
                                                            }
                                                        }}
                                                        popupRender={menu => <div style={{ background: 'white', borderRadius: 8 }}>{menu}</div>}
                                                    >
                                                        {airportOptions.map((airport) => (
                                                            <Select.Option
                                                                key={airport.iata_code + airport.city}
                                                                value={airport.iata_code}
                                                                label={`${airport.city}, ${airport.country}`}
                                                                airport={airport}
                                                            >
                                                                {renderAirportOption(airport)}
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                </div>
                                                <div className={styles["field-group"] + ' ' + styles["multiCity-field"]}>
                                                    <label>To</label>
                                                    <Select
                                                        variant="filled"
                                                        showSearch
                                                        placeholder="Airport/City Name"
                                                        value={segment.to?.iata_code}
                                                        onChange={val => handleSegmentChange(idx, 'to', airportOptions.find(a => a.iata_code === val) || null)}
                                                        filterOption={(input, option) => {
                                                            const airport = option?.airport;
                                                            return (
                                                                airport.city.toLowerCase().includes(input.toLowerCase()) ||
                                                                airport.iata_code.toLowerCase().includes(input.toLowerCase()) ||
                                                                airport.country.toLowerCase().includes(input.toLowerCase())
                                                            );
                                                        }}
                                                        optionLabelProp="label"
                                                        labelInValue
                                                        styles={{
                                                            popup: {
                                                                root: {
                                                                    background: 'white',
                                                                    padding: 8,
                                                                    borderRadius: 8,
                                                                }
                                                            }
                                                        }}
                                                        popupRender={menu => <div style={{ background: 'white', borderRadius: 8 }}>{menu}</div>}
                                                    >
                                                        {airportOptions.map((airport) => (
                                                            <Select.Option
                                                                key={airport.iata_code + airport.city + 'to'}
                                                                value={airport.iata_code}
                                                                label={`${airport.city}, ${airport.country}`}
                                                                airport={airport}
                                                            >
                                                                {renderAirportOption(airport)}
                                                            </Select.Option>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className={styles["multiCity-date-row"]}>
                                                <div className={styles["field-group"] + ' ' + styles["multiCity-field"]} style={{ width: '100%' }}>
                                                    <label>Departure</label>
                                                    <DatePicker
                                                        value={segment.departDate}
                                                        onChange={date => handleSegmentChange(idx, 'departDate', date)}
                                                        placeholder="Select"
                                                        variant="filled"
                                                        style={{ width: '100%' }}
                                                    />
                                                </div>
                                                {multiCitySegments.length > 1 && (
                                                    <Button
                                                        type="text"
                                                        danger
                                                        style={{ position: 'absolute', top: 8, right: 8 }}
                                                        onClick={() => handleRemoveSegment(idx)}
                                                    >Remove</Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        type="default"
                                        onClick={handleAddSegment}
                                        disabled={multiCitySegments.length >= 3}
                                        style={{ marginBottom: 16 }}
                                    >+ ADD ANOTHER CITY</Button>
                                </div>
                            ) : (
                                <>
                                    {/* From and To Fields */}
                                    <div className={styles["fields"]}>
                                        <FormField {...formFields.from} />
                                        <FormField {...formFields.to} />
                                    </div>

                                    {/* Depart and Return Date Fields */}
                                    <div className={styles["fields"]}>
                                        <FormField {...formFields.departDate} />
                                        <FormField {...formFields.returnDate} />
                                    </div>
                                </>
                            )}
                            {/* Passengers and Class Fields */}
                            <div className={styles["fields"]}>
                                <FormField {...formFields.passengers} />
                                <FormField {...formFields.class} />
                            </div>
                            {/* Name and Mobile Fields */}
                            <div className={styles["fields"]}>
                                <FormField {...formFields.name} />
                                <FormField {...formFields.mobile} />
                            </div>
                            <Form.Item>
                                <Button type="default" htmlType="submit" className={styles["search-btn"]}>
                                    Submit now
                                </Button>
                            </Form.Item>
                        </Form>

                        <div className={styles["book-flights-typography"]} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 50, color: 'black', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <Typography.Title level={2} style={{ color: 'black', marginBottom: 0 }}>
                                Book Cheap Flights
                            </Typography.Title>

                            <Typography.Text style={{ color: 'black', fontSize: 16 }}>
                                with us & enjoy big savings!
                            </Typography.Text>
                        </div>
                    </div>

                    <FeatureBar />
                </div>

                <FlightInfoBox />
            </div>

            <FooterSection />

            <BottomCallBanner />

            {/* Scroll to top button */}
            <button
                className={`${styles["scroll-to-top-btn"]}${showScrollTop ? "" : ` ${styles["hide"]}`}`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <UpOutlined style={{ color: 'white' }} />
            </button>
        </div>
    );
} 
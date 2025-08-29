// SlideOne.tsx
import { styles } from "@/styles/SlideOne.styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, Phone } from "lucide-react-native";
import React, { useState } from "react";
import { Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const SlideOne = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    idNumber,
    setIdNumber,
    dateOfBirth,
    setDateOfBirth,
    primaryPhoneNum,
    setPrimaryPhoneNum,
    secondaryPhoneNum,
    setSecondaryPhoneNum,
    missingFirstNameError,
    missingLastNameError,
    missingNumberError,
    missingDateOfBirthError,
    missingPrimaryPhoneNumError,
    loading
}: {
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    idNumber: string;
    setIdNumber: (value: string) => void;
    dateOfBirth: string;
    setDateOfBirth: (value: string) => void;
    primaryPhoneNum: string;
    setPrimaryPhoneNum: (value: string) => void;
    secondaryPhoneNum: string;
    setSecondaryPhoneNum: (value: string) => void;
    missingFirstNameError: string;
    missingLastNameError: string;
    missingNumberError: string;
    missingDateOfBirthError: string;
    missingPrimaryPhoneNumError: string;
    loading?: boolean;
}) => {
    const [show, setShow] = useState(false);

    const onChange = (_event: any, selectedDate?: Date) => {
        setShow(false);
        if (selectedDate) setDateOfBirth(selectedDate.toISOString());
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Personal Details</Text>
                <Text style={styles.subtitle}>Let's get to know You</Text>
                <View style={styles.inputContainer}>
                    {missingFirstNameError && (
                        <Text style={styles.errorText}>
                            {missingFirstNameError}
                        </Text>
                    )}
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                        keyboardType="default"
                        autoCapitalize="words"
                        autoComplete="given-name"
                        editable={!loading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    {missingLastNameError && (
                        <Text style={styles.errorText}>
                            {missingLastNameError}
                        </Text>
                    )}
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                        keyboardType="default"
                        autoCapitalize="words"
                        autoComplete="family-name"
                        editable={!loading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    {missingNumberError && (
                        <Text style={styles.errorText}>
                            {missingNumberError}
                        </Text>
                    )}
                    <Text style={styles.label}>ID Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ID Number"
                        value={idNumber}
                        onChangeText={setIdNumber}
                        keyboardType="default"
                        autoCapitalize="none"
                        autoComplete="off"
                        editable={!loading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    {missingPrimaryPhoneNumError && (
                        <Text style={styles.errorText}>
                            {missingPrimaryPhoneNumError}
                        </Text>
                    )}
                    <View style={{ flexDirection: "row", alignContent: "center", }}>
                        <View style={{ width: "10%", justifyContent: "center", }}>
                            <Phone size={20} color="#333" style={{ margin: 0 }} />
                        </View>

                        <View style={{ width: "90%", margin: 0 }}>
                            <TextInput
                                style={[styles.input, { width: '100%' }]}
                                placeholder="Primary Phone Number"
                                value={primaryPhoneNum}
                                onChangeText={setPrimaryPhoneNum}
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                                autoComplete="off"
                                editable={!loading}
                            />
                        </View>
                    </View>

                </View>
                <View style={styles.inputContainer}>
                    <View style={{ flexDirection: "row", alignContent: "center", }}>
                        <View style={{ width: "10%", justifyContent: "center", }}>
                            <Phone size={20} color="#333" style={{ margin: 0 }} />
                        </View>

                        <View style={{ width: "90%", margin: 0 }}>
                            <TextInput
                                style={[styles.input, { width: '100%' }]}
                                placeholder="Secondary Phone Number"
                                value={secondaryPhoneNum}
                                onChangeText={setSecondaryPhoneNum}
                                keyboardType="phone-pad"
                                autoCapitalize="none"
                                autoComplete="off"
                                editable={!loading}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    {missingDateOfBirthError && (
                        <Text style={styles.errorText}>
                            {missingDateOfBirthError}
                        </Text>
                    )}
                    <Text style={styles.label}>Date of Birth</Text>
                    <TouchableOpacity onPress={() => { setShow(true) }} >
                        <View style={{ flexDirection: 'row', alignContent: "center" }}>

                            <Calendar size={32} color="#FF700A" />

                            {show && (
                                <DateTimePicker
                                    value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
                                    mode="date"
                                    display={Platform.OS === "ios" ? "spinner" : "calendar"}
                                    onChange={onChange}
                                />
                            )}
                            {dateOfBirth &&
                                <Text style={{ marginTop: 5, marginLeft: 20, fontSize: 18, fontWeight: "500" }}>
                                    {formatDate(dateOfBirth)}
                                </Text>}
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView >
    );
};

export default SlideOne;


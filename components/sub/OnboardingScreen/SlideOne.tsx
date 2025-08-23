// SlideOne.tsx
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, Phone } from "lucide-react-native";
import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

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
    loading?: boolean;
}) => {
    const [show, setShow] = useState(false);

    const onChange = (_event: any, selectedDate?: Date) => {
        setShow(false);
        if (selectedDate) setDateOfBirth(selectedDate.toISOString());
    };


    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Personal Details</Text>
                <Text style={styles.subtitle}>Let's get to know You</Text>
                <View style={styles.inputContainer}>
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
                    <Text style={styles.label}>Date of Birth</Text>
                    <View style={{ flexDirection: 'row', alignContent: "center" }}>
                        <TouchableOpacity onPress={() => { setShow(true) }} >
                            <Calendar size={32} color="#FF700A" />
                        </TouchableOpacity>
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
                                {dateOfBirth}
                            </Text>}
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <View style={{ flexDirection: "row", alignContent: "center" }}>
                        <View style={{ marginRight: 10, width: "15%" }}>
                            <Phone size={24} color="#666" />
                        </View>

                        <View style={{ width: "85%" }}>
                            <TextInput
                                style={[styles.input, {width: '100%'}]}
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
                    <Text style={styles.label}>Secondary Phone Number</Text>
                    <TextInput
                        style={styles.input}
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
        </ScrollView >
    );
};

export default SlideOne;

const styles = StyleSheet.create({

    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        width: '100%',
        padding: 20,
    },
    formContainer: {
        flex: 1,
        width: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#666',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%',
    },
});

// SlideTwo.tsx
import { styles } from "@/styles/SlideTwo.styles";
import React from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

const SlideTwo = ({
    storeName,
    setStoreName,
    industry,
    setIndustry,
    location,
    setLocation,
    district,
    setDistrict,
    country,
    setCountry,
    missingStoreNameError,
    missingIndustryError,
    missingLocationError,
    missingDistrictError,
    missingCountryError,
    loading
}: {
    storeName: string;
    setStoreName: (value: string) => void;
    industry: string;
    setIndustry: (value: string) => void;
    location: string;
    setLocation: (value: string) => void;
    district: string;
    setDistrict: (value: string) => void;
    country: string;
    setCountry: (value: string) => void;
    missingStoreNameError: string;
    missingIndustryError: string;
    missingLocationError: string;
    missingDistrictError: string;
    missingCountryError: string;
    loading?: boolean;
}
) => {


    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Store Details</Text>
                <Text style={styles.subtitle}>Tell us about your store</Text>
                <View style={styles.inputContainer}>
                    {missingStoreNameError && (
                        <Text style={styles.errorText}>
                            {missingStoreNameError}
                        </Text>
                    )}
                    <Text style={styles.label}>Store Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Store Name"
                        value={storeName}
                        onChangeText={setStoreName}
                        keyboardType="default"
                        autoCapitalize="words"
                        autoComplete="off"
                        editable={!loading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    {missingIndustryError && (
                        <Text style={styles.errorText}>
                            {missingIndustryError}
                        </Text>
                    )}
                    <Text style={styles.label}>Industry</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Industry"
                        value={industry}
                        onChangeText={setIndustry}
                        keyboardType="default"
                        autoCapitalize="words"
                        autoComplete="off"
                        editable={!loading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    {missingLocationError && (
                        <Text style={styles.errorText}>
                            {missingLocationError}
                        </Text>
                    )}
                    <Text style={styles.label}>Location</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Location"
                        value={location}
                        onChangeText={setLocation}
                        keyboardType="default"
                        autoCapitalize="words"
                        autoComplete="off"
                        editable={!loading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    {missingDistrictError && (
                        <Text style={styles.errorText}>
                            {missingDistrictError}
                        </Text>
                    )}
                    <Text style={styles.label}>District</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="District"
                        value={district}
                        onChangeText={setDistrict}
                        keyboardType="default"
                        autoCapitalize="words"
                        autoComplete="off"
                        editable={!loading}
                    />
                </View>
                <View style={styles.inputContainer}>
                    {missingCountryError && (
                        <Text style={styles.errorText}>
                            {missingCountryError}
                        </Text>
                    )}
                    <Text style={styles.label}>Country</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Country"
                        value={country}
                        onChangeText={setCountry}
                        keyboardType="default"
                        autoCapitalize="words"
                        autoComplete="off"
                        editable={!loading}
                    />
                </View>

            </View>
        </ScrollView >
    );
};

export default SlideTwo;



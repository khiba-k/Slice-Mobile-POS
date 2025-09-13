// OnboardingForm.tsx
import LoadingPage from "@/components/shared/LoadingPage";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useToastStore } from "@/store/useToastStore";
import { useUserStore } from "@/store/useUserStore";
import { styles } from "@/styles/OnboardingForm.styles";
import { createStoreOwner, validateForm } from "@/utils/OnboardingForm.utils";
import { useRouter } from "expo-router";
import { Check, ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";

const OnboardingForm = () => {
    const [step, setStep] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [missingFirstNameError, setMissingFirstNameError] = useState('');
    const [lastName, setLastName] = useState("");
    const [missingLastNameError, setMissingLastNameError] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [missingIdNumberError, setMissingIdNumberError] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [missingDateOfBirthError, setMissingDateOfBirthError] = useState("");
    const [primaryPhoneNum, setPrimaryPhoneNum] = useState("");
    const [missingPrimaryPhoneNumError, setMissingPrimaryPhoneNumError] = useState("");
    const [secondaryPhoneNum, setSecondaryPhoneNum] = useState("");
    const [storeName, setStoreName] = useState("");
    const [missingStoreNameError, setMissingStoreNameError] = useState("");
    const [industry, setIndustry] = useState("");
    const [missingIndustryError, setMissingIndustryError] = useState("");
    const [location, setLocation] = useState("");
    const [missingLocationError, setMissingLocationError] = useState("");
    const [district, setDistrict] = useState("");
    const [missingDistrictError, setMissingDistrictError] = useState("");
    const [country, setCountry] = useState("Lesotho");
    const [missingCountryError, setMissingCountryError] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const router = useRouter();
    const { showToast } = useToastStore();

    // Form Slides Array
    const slides = [<SlideOne key="1"
        firstName={firstName} setFirstName={setFirstName}
        lastName={lastName} setLastName={setLastName} idNumber={idNumber}
        setIdNumber={setIdNumber} dateOfBirth={dateOfBirth}
        setDateOfBirth={setDateOfBirth} primaryPhoneNum={primaryPhoneNum}
        setPrimaryPhoneNum={setPrimaryPhoneNum} secondaryPhoneNum={secondaryPhoneNum}
        setSecondaryPhoneNum={setSecondaryPhoneNum}
        missingFirstNameError={missingFirstNameError}
        missingLastNameError={missingLastNameError}
        missingNumberError={missingIdNumberError}
        missingDateOfBirthError={missingDateOfBirthError}
        missingPrimaryPhoneNumError={missingPrimaryPhoneNumError}
        loading={loading}
    />, <SlideTwo
        key="2"
        storeName={storeName} setStoreName={setStoreName}
        industry={industry} setIndustry={setIndustry}
        location={location} setLocation={setLocation} district={district}
        setDistrict={setDistrict} country={country} setCountry={setCountry}
        missingStoreNameError={missingStoreNameError}
        missingIndustryError={missingIndustryError}
        missingLocationError={missingLocationError}
        missingDistrictError={missingDistrictError}
        missingCountryError={missingCountryError}
        loading={loading}
    />];

    // Go to next slide
    const goNext = () => {
        setMissingFirstNameError("");
        setMissingLastNameError("");
        setMissingIdNumberError("");
        setMissingDateOfBirthError("");
        setMissingPrimaryPhoneNumError("");
        setMissingStoreNameError("");
        setMissingIndustryError("");
        setMissingLocationError("");
        setMissingDistrictError("");
        setMissingCountryError("");
        setStoreName("placeholder");
        setIndustry("placeholder");
        setLocation("placeholder");
        setDistrict("placeholder");

        if (!validateForm(
            firstName, lastName, idNumber, dateOfBirth, primaryPhoneNum,
            storeName, industry, location, district, country,
            setMissingFirstNameError, setMissingLastNameError,
            setMissingIdNumberError, setMissingDateOfBirthError,
            setMissingPrimaryPhoneNumError, setMissingStoreNameError,
            setMissingIndustryError, setMissingLocationError,
            setMissingDistrictError, setMissingCountryError
        )) {
            return;
        }

        if (step < slides.length - 1) {
            setStep(step + 1);
            setStoreName("");
            setIndustry("");
            setLocation("");
            setDistrict("");
        }
    };

    // Got to previous slide
    const goBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    // Handle Submit form button
    const handleSubmit = async () => {
        setLoading(true);
        setMissingFirstNameError("");
        setMissingLastNameError("");
        setMissingIdNumberError("");
        setMissingDateOfBirthError("");
        setMissingPrimaryPhoneNumError("");
        setMissingStoreNameError("");
        setMissingIndustryError("");
        setMissingLocationError("");
        setMissingDistrictError("");
        setMissingCountryError("");

        if (!validateForm(
            firstName,
            lastName,
            idNumber,
            dateOfBirth,
            primaryPhoneNum,
            storeName,
            industry,
            location,
            district,
            country,
            setMissingFirstNameError,
            setMissingLastNameError,
            setMissingIdNumberError,
            setMissingDateOfBirthError,
            setMissingPrimaryPhoneNumError,
            setMissingStoreNameError,
            setMissingIndustryError,
            setMissingLocationError,
            setMissingDistrictError,
            setMissingCountryError
        )) {
            setLoading(false);
            return;
        }

        try {
            const userCreated: any = await createStoreOwner({
                userId: user?.uid || "",
                firstName,
                lastName,
                idNumber,
                dateOfBirth,
                email: user?.email || "",
                primaryPhoneNum,
                secondaryPhoneNum,
                storeData: {
                    name: storeName,
                    industry: storeName,
                    location: location,
                    district: district,
                    country
                }
            });

            if (userCreated) {
                showToast(true, "Onboarding completed successfully!");
                useUserStore.getState().setUserAndStore(userCreated.data.user, userCreated.data.store);
                router.push("/(slice)/pos");
            }

        } catch (error: any) {
            showToast(false, error?.message || "Error creating user");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (<LoadingPage />) :

                (<>
                    <View style={styles.slideContainer}>{slides[step]}</View>

                    <View style={[styles.navContainer,
                    { justifyContent: step === 0 ? "flex-end" : "space-between" }
                    ]}>
                        {step > 0 && (
                            <>
                                <TouchableOpacity onPress={goBack} style={styles.chevron}>
                                    <ChevronLeft size={40} color='#333' />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.check} onPress={handleSubmit}>
                                    <Check size={40} color="#FF700A" />
                                </TouchableOpacity>
                            </>
                        )}

                        {step < slides.length - 1 && (
                            <TouchableOpacity onPress={goNext} style={styles.chevron}>
                                <ChevronRight size={40} color="#FF700A" />
                            </TouchableOpacity>
                        )}
                    </View>
                </>)}
        </View>
    );
};

export default OnboardingForm;



// OnboardingForm.tsx
import { Check, ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { styles } from "@/styles/OnboardingForm.styles";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";

const OnboardingForm = () => {
    const [step, setStep] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [primaryPhoneNum, setPrimaryPhoneNum] = useState("");
    const [secondaryPhoneNum, setSecondaryPhoneNum] = useState("");
    const [loading, setLoading] = useState(false);

    const slides = [<SlideOne key="1" 
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        idNumber={idNumber}
        setIdNumber={setIdNumber}
        dateOfBirth={dateOfBirth}
        setDateOfBirth={setDateOfBirth}
        primaryPhoneNum={primaryPhoneNum}
        setPrimaryPhoneNum={setPrimaryPhoneNum}
        secondaryPhoneNum={secondaryPhoneNum}
        setSecondaryPhoneNum={setSecondaryPhoneNum}
        loading={loading}
    />, <SlideTwo key="2" />];

    const goNext = () => {
        if (step < slides.length - 1) {
            setStep(step + 1);
        }
    };

    const goBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.slideContainer}>{slides[step]}</View>

            <View style={[styles.navContainer,
            { justifyContent: step === 0 ? "flex-end" : "space-between" }
            ]}>
                {step > 0 && (
                    <>
                        <TouchableOpacity onPress={goBack} style={styles.chevron}>
                            <ChevronLeft size={40} color='#333' />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.check}>
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
        </View>
    );
};

export default OnboardingForm;



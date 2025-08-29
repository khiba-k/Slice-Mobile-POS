import { createUser } from "@/lib/requests/user.requests";

interface UserProfile {
    userId: string;
    firstName: string;
    lastName: string;
    idNumber: string;
    dateOfBirth: string;
    primaryPhoneNum: string;
    secondaryPhoneNum: string;
    storeName: string;
    industry: string;
    location: string;
    district: string;
    country: string;
}

export interface UserData extends UserProfile {
    isOwner: boolean;
}

// Create Store Owner Helper (OnboardingForm.tsx)
export const createStoreOwner = (userData: UserProfile) => {
    try {
        const response = createUser({ ...userData, isOwner: true });

        return response;
    } catch (error) {
        console.error("Error creating store owner:", error);
        return error;
    }
}

// Validate Onboarding form(OnboardingForm.tsx)
export const validateForm = (
    firstName: string,
    lastName: string,
    idNumber: string,
    dateOfBirth: string,
    primaryPhoneNum: string,
    storeName: string,
    industry: string,
    location: string,
    district: string,
    country: string,
    setMissingFirstNameError: (error: string) => void,
    setMissingLastNameError: (error: string) => void,
    setMissingIdNumberError: (error: string) => void,
    setMissingDateOfBirthError: (error: string) => void,
    setMissingPrimaryPhoneNumError: (error: string) => void,
    setMissingStoreNameError: (error: string) => void,
    setMissingIndustryError: (error: string) => void,
    setMissingLocationError: (error: string) => void,
    setMissingDistrictError: (error: string) => void,
    setMissingCountryError: (error: string) => void
): boolean => {

    if (firstName.length < 2) {
        setMissingFirstNameError('Please enter your first name');
        return false;
    }
    if (lastName.length < 2) {
        setMissingLastNameError('Please enter your last name');
        return false;
    }
    if (idNumber.length < 5) {
        setMissingIdNumberError('Please enter a valid ID number');
        return false;
    }
    if (primaryPhoneNum.length < 8) {
        setMissingPrimaryPhoneNumError('Please enter a valid phone number');
        return false;
    }

    if (!dateOfBirth.trim()) {
        setMissingDateOfBirthError('Please enter your date of birth');
        return false;
    }
    if (storeName.length < 2) {
        setMissingStoreNameError('Please enter your store name');
        return false;
    }
    if (industry.length < 2) {
        setMissingIndustryError('Please enter your store industry');
    }
    if (location.length < 2) {
        setMissingLocationError('Please enter your store location');
    }
    if (district.length < 2) {
        setMissingDistrictError('Please enter your store district');
    }
    if (country.length < 2) {
        setMissingCountryError('Please enter your store country');
    }

    return true;
};
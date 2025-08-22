export const validateForm = (
    email: string,
    password: string,
    setMissingEmailError: (error: string) => void,
    setValidEmailError: (error: string) => void,
    setMissingPasswordError: (error: string) => void,
): boolean => {
    if (!email.trim()) {
        setMissingEmailError('Please enter your email address');
        return false;
    }

    if (!password.trim()) {
        setMissingPasswordError('Please enter your password');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setValidEmailError('Please enter a valid email address');
        return false;
    }

    return true;
};
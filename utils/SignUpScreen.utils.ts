export const validateForm = (
    email: string,
    password: string,
    confirmPassword: string,
    setMissingEmailError: (error: string) => void,
    setValidEmailError: (error: string) => void,
    setMissingPasswordError: (error: string) => void,
    setPasswordLengthError: (error: string) => void,
    setPasswordMismatchError: (error: string) => void
): boolean => {
    if (!email.trim()) {
      setMissingEmailError('Please enter your email address');
      return false;
    }

    if (!password.trim()) {
      setMissingPasswordError('Please enter your password');
      return false;
    }

    if (password.length < 6) {
      setPasswordLengthError('Password must be at least 6 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      setPasswordMismatchError('Passwords do not match');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidEmailError('Please enter a valid email address');
      return false;
    }

    return true;
  };
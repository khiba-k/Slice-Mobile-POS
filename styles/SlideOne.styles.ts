import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        width: '100%',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    formContainer: {
        flex: 1,
        width: '100%',
        paddingTop: 50,
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
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
    },
});

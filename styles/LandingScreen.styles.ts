import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCFAF7",
    },
    textView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "75%",
        width: "100%",
    },
    image: {
        width: 150,
        height: 150,
    },
    buttonsView: {
        justifyContent: "center",
        paddingHorizontal: 20,
        height: "25%",
        width: "100%",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "purple",
    },
    button: {
        borderWidth: 3,
        borderRadius: 8,
        borderColor: "#FF700A",
        marginVertical: 10,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    buttonText: {
        color: "#FF700A",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        padding: 10,
    },
});
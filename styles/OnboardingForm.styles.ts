import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        height: "100%",
    },
    slideContainer: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        width: "100%",
    },
    navContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
    },
    chevron: {
        paddingBottom: 20,
        paddingHorizontal: 25,
        paddingTop: 15,
    },
    check: {
        paddingBottom: 20,
        paddingHorizontal: 25,
        paddingTop: 15,
    },
});
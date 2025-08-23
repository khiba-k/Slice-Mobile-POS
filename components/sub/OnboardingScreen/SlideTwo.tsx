// SlideTwo.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SlideTwo = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Store Details</Text>
            {/* Later add TextInput for storeName, industry, location etc. */}
        </View>
    );
};

export default SlideTwo;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 18, fontWeight: "600" },
});

import { styles } from "@/styles/InsightsScreen.styles";
import React from "react";
import { Text, View } from "react-native";

interface TotalCardsProps {
    totalUnitsSold: number;
    totalMoneyEarned: number;
}

const TotalCards: React.FC<TotalCardsProps> = ({ totalUnitsSold, totalMoneyEarned }) => {
    return (
        <View style={styles.totalCardsContainer}>
            <View style={styles.card}>
                <Text style={styles.title}>Total Units Sold</Text>
                <Text style={styles.value}>{totalUnitsSold}</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.title}>Total Money Earned</Text>
                <Text style={styles.value}>M {totalMoneyEarned}</Text>
            </View>
        </View>
    );
};

export default TotalCards;

import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface InventoryChartProps {
    title: string;
    data: { day: string; units: number; money: number }[];
    yKey: "units" | "money";
}

const InventoryChart: React.FC<InventoryChartProps> = ({ title, data, yKey }) => {
    // Format dates to dd/mm
    const formatDate = (dateString: string) => {
        // Assuming dateString is in format "YYYY-MM-DD" or similar
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}/${month}`;
    };

    const labels = data.map((item) => formatDate(item.day));
    const values = data.map((item) => item[yKey]);

    // Determine Y-axis label based on yKey
    const yAxisLabel = yKey === "units" ? "Units" : "Money";

    return (
        <View style={[styles.container, { flex: 0 }]}>
            <Text style={styles.title}>{title}</Text>

            {/* Y-axis label */}
            <View style={styles.yAxisContainer}>
                <Text style={styles.axisLabel}>{yAxisLabel}</Text>
            </View>

            <LineChart
                data={{
                    labels,
                    datasets: [{ data: values }],
                }}
                width={Dimensions.get("window").width - 30}
                height={220}
                chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    color: () => `#4CAF50`,
                    labelColor: () => "#333",
                    propsForDots: { r: "5", strokeWidth: "2", stroke: "#4CAF50" },
                }}
                bezier
                style={styles.chart}
            />

            {/* X-axis label */}
            <Text style={styles.xAxisLabel}>Dates</Text>
        </View>
    );
};

export default InventoryChart;

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
    },
    yAxisContainer: {
        position: "absolute",
        left: -10,
        top: "50%",
        transform: [{ rotate: "-90deg" }],
        zIndex: 1,
    },
    axisLabel: {
        fontSize: 12,
        fontWeight: "500",
        color: "#666",
    },
    xAxisLabel: {
        fontSize: 12,
        fontWeight: "500",
        color: "#666",
        marginTop: 5,
    },
    chart: {
        borderRadius: 10,
    },
});
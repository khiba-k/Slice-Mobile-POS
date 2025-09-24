import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const InventoryInsightsSkeleton: React.FC = () => {
    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: '#FFFFFF' }}
            contentContainerStyle={{
                paddingHorizontal: 6,
                paddingTop: 16,
                paddingBottom: 32,
                flexGrow: 1
            }}
            showsVerticalScrollIndicator={true}
        >
            {/* Item Row Skeleton */}
            <View style={styles.itemRow}>
                <View style={styles.imageSkeleton} />
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10, marginRight: 20 }}>
                    <View style={styles.textSkeletonLong} />
                    <View style={styles.textSkeletonShort} />
                </View>
                <View style={{ alignItems: "flex-end" }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonShort} />
                </View>
            </View>

            {/* Total Cards Skeleton */}
            <View style={styles.totalCardsContainer}>
                <View style={styles.cardSkeleton}>
                    <View style={styles.cardTitleSkeleton} />
                    <View style={styles.cardValueSkeleton} />
                </View>
                <View style={styles.cardSkeleton}>
                    <View style={styles.cardTitleSkeleton} />
                    <View style={styles.cardValueSkeleton} />
                </View>
            </View>

            {/* Chart Skeletons */}
            <View style={styles.chartContainer}>
                <View style={styles.chartTitleSkeleton} />
                <View style={styles.chartSkeleton} />
            </View>

            <View style={styles.chartContainer}>
                <View style={styles.chartTitleSkeleton} />
                <View style={styles.chartSkeleton} />
            </View>
        </ScrollView>
    );
};

export default InventoryInsightsSkeleton;

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 6,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E5EA',
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
        borderRadius: 8,
    },
    imageSkeleton: {
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor: '#F2F2F7',
    },
    textSkeletonShort: {
        height: 14,
        width: 60,
        backgroundColor: '#E0E0E0',
        marginVertical: 4,
        borderRadius: 4,
    },
    textSkeletonLong: {
        height: 16,
        width: 120,
        backgroundColor: '#E0E0E0',
        marginVertical: 4,
        borderRadius: 4,
    },
    totalCardsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    cardSkeleton: {
        flex: 1,
        margin: 5,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#F2F2F7",
        alignItems: "center",
        height: 80,
        justifyContent: "center",
    },
    cardTitleSkeleton: {
        height: 14,
        width: 90,
        backgroundColor: '#E0E0E0',
        marginBottom: 8,
        borderRadius: 4,
    },
    cardValueSkeleton: {
        height: 18,
        width: 50,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
    },
    chartContainer: {
        marginVertical: 15,
        alignItems: "center",
    },
    chartTitleSkeleton: {
        height: 16,
        width: 150,
        backgroundColor: '#E0E0E0',
        marginBottom: 10,
        borderRadius: 4,
    },
    chartSkeleton: {
        width: '100%',
        height: 220,
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
    },
});
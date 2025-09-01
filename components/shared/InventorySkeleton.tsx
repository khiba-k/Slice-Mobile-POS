import { View, StyleSheet } from 'react-native';
import React from 'react';

const InventorySkeleton = () => {
    return (
        <>
            <View style={styles.tableRow}>
                {/* Image Placeholder */}
                <View style={styles.imageSkeleton} />

                {/* Info Placeholder */}
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonLong} />
                </View>

                {/* Price & Stock Placeholder */}
                <View style={{ alignItems: "flex-end" }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonShort} />
                </View>
            </View>
            <View style={styles.tableRow}>
                {/* Image Placeholder */}
                <View style={styles.imageSkeleton} />

                {/* Info Placeholder */}
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonLong} />
                </View>

                {/* Price & Stock Placeholder */}
                <View style={{ alignItems: "flex-end" }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonShort} />
                </View>
            </View>
            <View style={styles.tableRow}>
                {/* Image Placeholder */}
                <View style={styles.imageSkeleton} />

                {/* Info Placeholder */}
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonLong} />
                </View>

                {/* Price & Stock Placeholder */}
                <View style={{ alignItems: "flex-end" }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonShort} />
                </View>
            </View>
            <View style={styles.tableRow}>
                {/* Image Placeholder */}
                <View style={styles.imageSkeleton} />

                {/* Info Placeholder */}
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonLong} />
                </View>

                {/* Price & Stock Placeholder */}
                <View style={{ alignItems: "flex-end" }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonShort} />
                </View>
            </View>
            <View style={styles.tableRow}>
                {/* Image Placeholder */}
                <View style={styles.imageSkeleton} />

                {/* Info Placeholder */}
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonLong} />
                </View>

                {/* Price & Stock Placeholder */}
                <View style={{ alignItems: "flex-end" }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonShort} />
                </View>
            </View>
            <View style={styles.tableRow}>
                {/* Image Placeholder */}
                <View style={styles.imageSkeleton} />

                {/* Info Placeholder */}
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonLong} />
                </View>

                {/* Price & Stock Placeholder */}
                <View style={{ alignItems: "flex-end" }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonShort} />
                </View>
            </View>
            <View style={styles.tableRow}>
                {/* Image Placeholder */}
                <View style={styles.imageSkeleton} />

                {/* Info Placeholder */}
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonLong} />
                </View>

                {/* Price & Stock Placeholder */}
                <View style={{ alignItems: "flex-end" }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonShort} />
                </View>
            </View>
            <View style={styles.tableRow}>
                {/* Image Placeholder */}
                <View style={styles.imageSkeleton} />

                {/* Info Placeholder */}
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonLong} />
                </View>

                {/* Price & Stock Placeholder */}
                <View style={{ alignItems: "flex-end" }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonShort} />
                </View>
            </View>
            <View style={styles.tableRow}>
                {/* Image Placeholder */}
                <View style={styles.imageSkeleton} />

                {/* Info Placeholder */}
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonLong} />
                </View>

                {/* Price & Stock Placeholder */}
                <View style={{ alignItems: "flex-end" }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonShort} />
                </View>
            </View>
            <View style={styles.tableRow}>
                {/* Image Placeholder */}
                <View style={styles.imageSkeleton} />

                {/* Info Placeholder */}
                <View style={{ flex: 1, flexDirection: "column", marginLeft: 10 }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonLong} />
                </View>

                {/* Price & Stock Placeholder */}
                <View style={{ alignItems: "flex-end" }}>
                    <View style={styles.textSkeletonShort} />
                    <View style={styles.textSkeletonShort} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14, // matches your tableRow
        paddingHorizontal: 6, // matches your tableRow
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E5EA',
        backgroundColor: '#FFFFFF',
        marginBottom: 8,
        borderRadius: 8,
    },
    imageSkeleton: {
        width: 50, // matches itemImage
        height: 50,
        borderRadius: 8,
        backgroundColor: '#F2F2F7', // matches itemImage background
    },
    textSkeletonShort: {
        height: 14, // matches itemNumber/price
        width: 60,
        backgroundColor: '#E0E0E0',
        marginVertical: 4,
        borderRadius: 4,
    },
    textSkeletonLong: {
        height: 16, // matches itemName fontSize
        width: 120,
        backgroundColor: '#E0E0E0',
        marginVertical: 4,
        borderRadius: 4,
    },
});

export default InventorySkeleton;

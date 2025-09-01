import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

const FabMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const animation = useRef(new Animated.Value(0)).current

    const toggleMenu = () => {
        const toValue = isOpen ? 0 : 1

        Animated.spring(animation, {
            toValue,
            friction: 5,
            useNativeDriver: true,
        }).start()

        setIsOpen(!isOpen)
    }

    const newSaleStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -120], // how far above main FAB
                }),
            },
        ],
        opacity: animation,
    }

    const addInventoryStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -70], // further above
                }),
            },
        ],
        opacity: animation,
    }

    return (
        <View style={styles.container}>

            {/* New Sale Button */}
            <Animated.View style={[styles.secondaryButton, newSaleStyle]}>
                <TouchableOpacity
                    onPress={() => console.log("New Sale")}
                    style={styles.bubble}
                >
                    <Ionicons name="cart-outline" size={24} color="#fff" />
                    <Text style={styles.label}>New Sale</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Add Inventory Button */}
            <Animated.View style={[styles.secondaryButton, addInventoryStyle]}>
                <TouchableOpacity
                    onPress={() => console.log("Add Inventory")}
                    style={styles.bubble}
                >

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="cube-outline" size={24} color="#fff" />
                        <View style={{ flexDirection: "column" }}>
                            <Text style={styles.label}>Add</Text>
                            <Text style={styles.label}>Inventory</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>

            {/* Main FAB */}
            <TouchableOpacity
                style={styles.fab}
                onPress={toggleMenu}
                activeOpacity={0.8}
            >
                <Ionicons name={isOpen ? "close" : "add"} size={28} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 70,
        right: 20,
        alignItems: "center",
    },
    fab: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#FF700A",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    secondaryButton: {
        position: "absolute",
        right: 0,
        alignItems: "center",
    },
    bubble: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#6200EE",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
        width: 120,
    },
    label: {
        color: "#fff",
        marginLeft: 6,
        fontSize: 14,
    },
})

export default FabMenu

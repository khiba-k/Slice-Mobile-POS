import { Tabs } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet, Animated, Text } from 'react-native';
import { useRef, useState } from "react";


export default function PosLayout() {
    const [isOpen, setIsOpen] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleMenu = () => {
        console.log("Toggle Menu");
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
                    outputRange: [0, -70], // how far above main FAB
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
                    outputRange: [0, -140], // further above
                }),
            },
        ],
        opacity: animation,
    }

    return (
        <View style={styles.container}>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#FF700A',
                    tabBarInactiveTintColor: '#8E8E93',
                    tabBarStyle: {
                        // shadowColor: 'transparent',
                    },
                    headerStyle: {
                        backgroundColor: '#FFFFFF',
                        // shadowColor: 'transparent',
                    },
                    headerTintColor: '#FF700A',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                    headerRight: () => (
                        <Ionicons
                            name="ellipsis-vertical"
                            size={24}
                            color="#8E8E93"
                            style={{ marginRight: 15 }}
                        />
                    ),
                }}
            >
                <Tabs.Screen
                    name="sales"
                    options={{
                        headerLeft: () => (
                            <Ionicons
                                name="card"
                                size={28}
                                color="#FF700A"
                                style={{ marginLeft: 15, marginRight: 15 }}
                            />),
                        title: "Sales",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="card" size={size} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="inventory"
                    options={{
                        headerLeft: () => (
                            <Ionicons
                                name="cube"
                                size={28}
                                color="#FF700A"
                                style={{ marginLeft: 15, marginRight: 15 }}
                            />),
                        title: "Inventory",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="cube" size={size} color={color} />
                        )
                    }}
                />
                <Tabs.Screen
                    name="insights"
                    options={{
                        headerLeft: () => (
                            <Ionicons
                                name="analytics"
                                size={28}
                                color="#FF700A"
                                style={{ marginLeft: 15, marginRight: 15 }}
                            />),
                        title: "Insights",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="analytics" size={size} color={color} />
                        )
                    }}
                />
            </Tabs>

            {/* Add Inventory Button */}
            <Animated.View style={[styles.secondaryButton, addInventoryStyle]}>
                <TouchableOpacity
                    onPress={() => console.log("Add Inventory")}
                    style={styles.bubble}
                >
                    <Ionicons name="cube-outline" size={24} color="#fff" />
                    <Text style={styles.label}>Add Inventory</Text>
                </TouchableOpacity>
            </Animated.View>

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

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={toggleMenu}
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={28} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FF700A',
        right: 20,
        bottom: 110,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    secondaryButton: {
        position: "absolute",
        right: 0,
        alignItems: "center",
    },
    bubble: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#03A9F4",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    label: {
        color: "#fff",
        marginLeft: 6,
        fontSize: 14,
    },
});
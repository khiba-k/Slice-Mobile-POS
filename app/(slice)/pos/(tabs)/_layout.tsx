import Menu from "@/components/shared/Menu";
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from "expo-router";


export default function PosLayout() {
    return (
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
                    <Menu />
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

    );
}

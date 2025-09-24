// Menu.tsx
import { logOut } from "@/lib/services/authService";
import { useToastStore } from "@/store/useToastStore";
import { useUserStore } from "@/store/useUserStore";
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Menu: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const { clearUser } = useUserStore();
    const { showToast } = useToastStore();

    const handleLogout = async () => {
        try {
            await logOut();
            showToast(true, "Logged Out");
            clearUser();
            setVisible(false);
        } catch (error: any) {
            console.log("Logout Error: ", error);
            showToast(false, "Logout Failed");
        }
    };

    return (
        <View>
            {/* Icon that toggles the menu */}
            <TouchableOpacity onPress={() => setVisible(true)}>
                <Ionicons name="ellipsis-vertical" size={24} color="#8E8E93" style={{ marginRight: 15 }} />
            </TouchableOpacity>

            {/* Menu Modal */}
            <Modal
                transparent
                visible={visible}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
                    <View style={styles.menu}>
                        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                            <Text style={styles.menuText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

export default Menu;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingTop: 50,
        paddingRight: 20,
    },
    menu: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingVertical: 5,
        width: 120,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    menuText: {
        fontSize: 16,
        color: "#333",
    },
});

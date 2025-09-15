import { useRouter } from 'expo-router';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DiscardModal = ({
    showConfirm,
    setShowConfirm,
}: {
    showConfirm: boolean;
    setShowConfirm: (confirm: boolean) => void;
}) => {
    const router = useRouter();
    return (
        <View>
            <Modal
                visible={showConfirm}
                transparent
                animationType="fade"
                onRequestClose={() => setShowConfirm(false)}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 20,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 12,
                            padding: 20,
                            width: "90%",
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 12 }}>
                            Discard changes?
                        </Text>
                        <Text style={{ color: "#555", marginBottom: 20 }}>
                            Are you sure you want to discard this unsaved inventory form?
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                gap: 12,
                            }}
                        >
                            <TouchableOpacity onPress={() => setShowConfirm(false)}>
                                <Text style={{ color: "#8E8E93", fontWeight: "600" }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    setShowConfirm(false);
                                    router.back();
                                }}
                            >
                                <Text style={{ color: "red", fontWeight: "600" }}>Discard</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default DiscardModal

const styles = StyleSheet.create({})
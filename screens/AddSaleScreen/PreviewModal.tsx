import { styles } from '@/styles/AddInventoryScreen.styles'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, Modal, TouchableOpacity, View } from 'react-native'

const PreviewModal = (
    {
        previewImage,
        setPreviewImage,
    }: {
        previewImage: string | null
        setPreviewImage: (uri: string | null) => void
    }
) => {
    return (
        <View>
            <Modal visible={!!previewImage} transparent animationType="fade">
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.modalClose}
                        onPress={() => setPreviewImage(null)}
                    >
                        <Ionicons name="close" size={32} color="#fff" />
                    </TouchableOpacity>

                    {previewImage && (
                        <Image
                            source={{ uri: previewImage }}
                            style={styles.fullscreenImage}
                            resizeMode="contain"
                        />
                    )}
                </View>
            </Modal>
        </View>
    )
}

export default PreviewModal

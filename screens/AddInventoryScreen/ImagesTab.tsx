import { styles } from '@/styles/AddInventoryScreen.styles';
import React from 'react';
import { ScrollView, Text } from 'react-native';

const ImagesTab = ({
    control,
}: {
    control: any;
}) => {
    return (
        <ScrollView style={styles.tabContainer}>
            <Text>Details Tab (Under Construction)</Text>
            {/* Display Image */}
            {/* <Text style={styles.label}>Display Image</Text>
            <Controller
                control={control}
                name="displayImage"
                render={({ field: { onChange, value } }) => (
                    <TouchableOpacity
                        style={styles.imagePicker}
                        onPress={async () => {
                            const result = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                quality: 0.7,
                            });
                            if (!result.canceled) {
                                onChange(result.assets[0].uri);
                            }
                        }}
                    >
                        {value ? <Image source={{ uri: value }} style={styles.imagePreview} /> : <Ionicons name="image" size={48} color="#888" />}
                    </TouchableOpacity>
                )}
            /> */}

            {/* Other Images */}
            {/* <Text style={styles.label}>Other Images</Text> */}
            {/* For simplicity, can use same image picker logic and store array */}
        </ScrollView>
    )
}

export default ImagesTab

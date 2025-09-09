import { styles } from '@/styles/AddInventoryScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const ImagesTab = ({ control }: { control: any }) => {
  // Helper to pick a single image
  const pickImage = async (onChange: (uri: string) => void) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      onChange(result.assets[0].uri);
    }
  };

  // Helper to pick multiple images
  const pickMultipleImages = async (value: string[], onChange: (newArray: string[]) => void) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newUris = result.assets.map((asset: { uri: string }) => asset.uri);
      onChange([...value, ...newUris]);
    }
  };

  return (
    <ScrollView style={styles.tabContainer}>
      {/* Display Image */}
      <Text style={styles.label}>Display Image</Text>
      <Controller
        control={control}
        name="displayImage"
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage(onChange)}>
            {value ? (
              <Image source={{ uri: value }} style={styles.imagePreview} />
            ) : (
              <Ionicons name="image" size={48} color="#888" />
            )}
          </TouchableOpacity>
        )}
      />

      {/* Other Images */}
      <Text style={styles.label}>Other Images</Text>
      <Controller
        control={control}
        name="otherImages"
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <View>
            <TouchableOpacity style={styles.imagePicker} onPress={() => pickMultipleImages(value, onChange)}>
              <Ionicons name="images" size={48} color="#888" />
              <Text>Add Images</Text>
            </TouchableOpacity>

            {/* Show previews */}
            <ScrollView horizontal>
              {value.map((uri: string, index: number) => (
                <Image key={index} source={{ uri }} style={styles.imagePreviewSmall} />
              ))}
            </ScrollView>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default ImagesTab;

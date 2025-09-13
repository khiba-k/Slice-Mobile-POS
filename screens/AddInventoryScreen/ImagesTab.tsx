import { styles } from '@/styles/AddInventoryScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = { control: any };

const ImagesTab: React.FC<Props> = ({ control }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Pick a single image (for display/thumbnail)
  const pickImage = async (onChange: (uri: string | null) => void) => {
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

  // Pick multiple images (for otherImages)
  const pickMultipleImages = async (
    value: string[],
    onChange: (newArray: string[]) => void
  ) => {
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
      onChange([...(value || []), ...newUris]);
    }
  };

  return (
    <ScrollView style={styles.tabContainer}>
      <View style={styles.header}>
        <Text style={{ color: '#FF700A', fontSize: 16 }}>Images</Text>
      </View>

      {/* Thumbnail / Display Image */}
      <Text style={styles.label}>Thumbnail Image</Text>
      <Controller
        control={control}
        name="displayImage"
        render={({ field: { onChange, value } }) => (
          <View style={styles.thumbnailWrapper}>
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={() => pickImage(onChange)}
              activeOpacity={0.9}
            >
              {value ? (
                <Image
                  source={{ uri: value }}
                  style={styles.imagePreview}
                  resizeMode="contain"
                />
              ) : (
                <Ionicons name="image" size={48} color="#888" />
              )}

              {value && (
                <>
                  {/* Expand button */}
                  <TouchableOpacity
                    style={styles.expandButtonInside}
                    onPress={() => setPreviewImage(value)}
                  >
                    <Ionicons name="expand" size={18} color="#fff" />
                  </TouchableOpacity>

                  {/* Remove button */}
                  <TouchableOpacity
                    style={styles.removeButtonInside}
                    onPress={() => onChange(null)}
                  >
                    <Ionicons name="close" size={18} color="#fff" />
                  </TouchableOpacity>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Additional Images */}
      <Text style={styles.label}>Additional Images</Text>
      <Controller
        control={control}
        name="otherImages"
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <View>
            <TouchableOpacity
              style={styles.imagePickerSmall}
              onPress={() => pickMultipleImages(value || [], onChange)}
            >
              <Ionicons name="images" size={36} color="#888" />
              <Text>Add Images</Text>
            </TouchableOpacity>

            {/* Previews */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Array.isArray(value) &&
                value.map((uri: string, index: number) => (
                  <View key={index} style={styles.imagePreviewWrapper}>
                    <TouchableOpacity onPress={() => setPreviewImage(uri)}>
                      <Image
                        source={{ uri }}
                        style={styles.imagePreviewSmall}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>

                    {/* Remove button */}
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() =>
                        onChange(value.filter((_: string, i: number) => i !== index))
                      }
                    >
                      <Ionicons name="close" size={14} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
          </View>
        )}
      />

      {/* Fullscreen Preview Modal */}
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
    </ScrollView>
  );
};

export default ImagesTab;

import { styles } from '@/styles/AddInventoryScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import PreviewModal from './PreviewModal';

export type FormImage = {
  id?: string; 
  uri: string;
  isDisplayImage: boolean;
  new?: boolean;
  removed?: boolean;
};

type Props = { control: any };

const ImagesTab: React.FC<Props> = ({ control }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // --- Helper: Pick single image ---
  const pickImageUri = async (): Promise<string | null> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      return result.assets[0].uri;
    }
    return null;
  };

  // --- Helper: Pick multiple images ---
  const pickMultipleImageUris = async (): Promise<string[] | null> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      return result.assets.map((asset: { uri: string }) => asset.uri);
    }
    return null;
  };

  // --- Helper: wrap URI into FormImage ---
  const wrapAsFormImage = (uri: string, isDisplayImage: boolean): FormImage => ({
    uri,
    isDisplayImage,
    new: true,
  });

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
        render={({ field: { onChange, value } }) => {
          const image = value as FormImage | null;

          return (
            <View style={styles.thumbnailWrapper}>
              <TouchableOpacity
                style={styles.imagePicker}
                activeOpacity={0.9}
                onPress={async () => {
                  const uri = await pickImageUri();
                  if (uri) onChange(wrapAsFormImage(uri, true));
                }}
              >
                {image ? (
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.imagePreview}
                    resizeMode="contain"
                  />
                ) : (
                  <Ionicons name="image" size={48} color="#888" />
                )}

                {image && (
                  <>
                    {/* Expand button */}
                    <TouchableOpacity
                      style={styles.expandButtonInside}
                      onPress={() => setPreviewImage(image.uri)}
                    >
                      <Ionicons name="expand" size={18} color="#fff" />
                    </TouchableOpacity>

                    {/* Remove button */}
                    <TouchableOpacity
                      style={styles.removeButtonInside}
                      onPress={() =>
                        onChange({ ...image, removed: true })
                      }
                    >
                      <Ionicons name="close" size={18} color="#fff" />
                    </TouchableOpacity>
                  </>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {/* Additional Images */}
      <Text style={styles.label}>Additional Images</Text>
      <Controller
        control={control}
        name="otherImages"
        defaultValue={[]}
        render={({ field: { onChange, value } }) => {
          const images = value as FormImage[];
          const maxReached = images.length >= 4;

          return (
            <View>
              <TouchableOpacity
                style={[styles.imagePickerSmall, maxReached && { opacity: 0.5 }]}
                disabled={maxReached}
                onPress={async () => {
                  if (maxReached) return;
                  const uris = await pickMultipleImageUris();
                  if (uris?.length) {
                    const newImgs = uris.map(uri => wrapAsFormImage(uri, false));
                    onChange([...images, ...newImgs]);
                  }
                }}
              >
                <Ionicons name="images" size={36} color="#888" />
                <Text>{maxReached ? 'Max 4 images reached' : 'Add Images'}</Text>
              </TouchableOpacity>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {images.map((img, index) => (
                  <View key={index} style={styles.imagePreviewWrapper}>
                    <TouchableOpacity onPress={() => setPreviewImage(img.uri)}>
                      <Image
                        source={{ uri: img.uri }}
                        style={styles.imagePreviewSmall}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>

                    {/* Remove button */}
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() =>
                        onChange(
                          images.map((i, idx) =>
                            idx === index ? { ...i, removed: true } : i
                          )
                        )
                      }
                    >
                      <Ionicons name="close" size={14} color="#fff" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          );
        }}
      />

      {/* Fullscreen Preview Modal */}
      <PreviewModal previewImage={previewImage} setPreviewImage={setPreviewImage} />
    </ScrollView>
  );
};

export default ImagesTab;

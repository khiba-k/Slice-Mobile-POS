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

  // --- Pick single image ---
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

  // --- Pick multiple images ---
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

  const wrapAsFormImage = (uri: string, isDisplayImage: boolean): FormImage => ({
    uri,
    isDisplayImage,
    new: true,
  });

  // Fixed removeImage function with better matching logic
  const removeImage = (images: FormImage[], imgToRemove: FormImage): FormImage[] => {
    return images.map((img) => {
      // Create a unique key for comparison - prefer id, fallback to uri
      const imgKey = img.id || img.uri;
      const removeKey = imgToRemove.id || imgToRemove.uri;

      if (imgKey === removeKey) {
        return { ...img, removed: true };
      }
      return img;
    });
  };

  return (
    <ScrollView style={styles.tabContainer}>
      <View style={styles.header}>
        <Text style={{ color: '#FF700A', fontSize: 16 }}>Images</Text>
      </View>

      {/* Thumbnail Image */}
      <Text style={styles.label}>Thumbnail Image</Text>
      <Controller
        control={control}
        name="displayImage"
        render={({ field: { onChange, value } }) => {
          const image = value as FormImage | null;
          const showImage = image && !image.removed;

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
                {showImage ? (
                  <Image
                    source={{ uri: image!.uri }}
                    style={styles.imagePreview}
                    resizeMode="contain"
                  />
                ) : (
                  <Ionicons name="image" size={48} color="#888" />
                )}

                {image && !image.removed && (
                  <>
                    <TouchableOpacity
                      style={styles.expandButtonInside}
                      onPress={() => setPreviewImage(image.uri)}
                    >
                      <Ionicons name="expand" size={18} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.removeButtonInside}
                      onPress={() => onChange({ ...image, removed: true })}
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
          const maxReached = images.filter(img => !img.removed).length >= 4;

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
                {images
                  .filter(img => !img.removed)
                  .map((img) => (
                    <View key={img.id ?? img.uri} style={styles.imagePreviewWrapper}>
                      <TouchableOpacity onPress={() => setPreviewImage(img.uri)}>
                        <Image
                          source={{ uri: img.uri }}
                          style={styles.imagePreviewSmall}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => {
                          const updatedImages = removeImage(images, img);
                          onChange(updatedImages);
                        }}
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
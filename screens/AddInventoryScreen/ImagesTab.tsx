import { styles } from '@/styles/AddInventoryScreen.styles';
import { pickImage, pickMultipleImages } from '@/utils/AddInventoryScreen.utils';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import PreviewModal from './PreviewModal';

type Props = { control: any };

const ImagesTab: React.FC<Props> = ({ control }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
        render={({ field: { onChange, value } }) => {
          const images = value || [];
          const maxReached = images.length >= 4;

          return (
            <View>
              <TouchableOpacity
                style={[
                  styles.imagePickerSmall,
                  maxReached && { opacity: 0.5 }
                ]}
                disabled={maxReached}
                onPress={() => {
                  if (maxReached) {
                    return;
                  }
                  pickMultipleImages(images, onChange);
                }}
              >
                <Ionicons name="images" size={36} color="#888" />
                <Text>{maxReached ? 'Max 4 images reached' : 'Add Images'}</Text>
              </TouchableOpacity>

              {/* Previews */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {images.map((uri: string, index: number) => (
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
                        onChange(images.filter((_: string, i: number) => i !== index))
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
      <PreviewModal
        previewImage={previewImage}
        setPreviewImage={setPreviewImage}
      />

    </ScrollView>
  );
};

export default ImagesTab;

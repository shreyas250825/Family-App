import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { compressImage } from '../utils/imageCompressor';

export const useMediaUpload = () => {
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const compressedUri = await compressImage(result.assets[0].uri);
      return compressedUri;
    }
    return null;
  };

  const pickMultipleImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 1,
    });

    if (!result.canceled) {
      const compressedUris = await Promise.all(
        result.assets.map(async (asset) => await compressImage(asset.uri))
      );
      return compressedUris;
    }
    return [];
  };

  return { uploading, setUploading, pickImage, pickMultipleImages };
};

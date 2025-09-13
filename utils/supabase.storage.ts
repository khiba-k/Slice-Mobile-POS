import { supabase } from '@/lib/supabase/supabase';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const BUCKET_NAME = "Slice";

/**
 * Upload an image to Supabase Storage and return its public URL
 * @param uri - The local image URI
 * @param folder - The folder inside the bucket (e.g. "inventory", "profile-pictures")
 */
// (AddInventoryScreen.utils.ts)
export const uploadImageToSupabase = async (
    uri: string,
    folder: string
): Promise<string | null> => {
    try {

        // 1. Generate unique file name
        const fileExt = uri.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${folder}/${fileName}`;

        // 2. Determine content type
        const getContentType = (extension: string): string => {
            switch (extension) {
                case 'jpg':
                case 'jpeg':
                    return 'image/jpeg';
                case 'png':
                    return 'image/png';
                case 'gif':
                    return 'image/gif';
                case 'webp':
                    return 'image/webp';
                default:
                    return 'image/jpeg';
            }
        };

        const contentType = getContentType(fileExt);

        // 3. Create FormData with the file
        const formData = new FormData();
        formData.append('file', {
            uri: uri,
            type: contentType,
            name: fileName,
        } as any);

        // 4. Upload to Supabase
        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, formData, {
                contentType: contentType,
                upsert: true,
            });

        if (error) {
            console.error("Supabase upload error:", error);
            throw error;
        }

        // 5. Get public URL
        const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

        return data.publicUrl;

    } catch (err) {
        console.error("Upload failed:", err);
        return null;
    }
};
import { styles } from '@/styles/InventoryScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

const LoadMoreButton = ({ onPress, isLoading, hasNextPage, totalItems, currentItemsCount }: {
    onPress: () => void;
    isLoading: boolean;
    hasNextPage: boolean;
    totalItems: number;
    currentItemsCount: number;
}) => {
    if (!hasNextPage || currentItemsCount >= totalItems) {
        return (
            null
        );
    }

    return (
        <TouchableOpacity
            style={[styles.loadMoreButton, isLoading && styles.loadMoreButtonDisabled]}
            onPress={onPress}
            disabled={isLoading}
        >
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="purple" />
                </View>
            ) : (
                <>
                <Text style={{color: "purple"}}>Load More</Text>
                    <Text style={styles.loadMoreText}>
                        <Ionicons name="chevron-down" size={24} color="purple" />
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
}

export default LoadMoreButton;
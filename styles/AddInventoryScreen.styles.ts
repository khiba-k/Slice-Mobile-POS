import { StyleSheet } from "react-native";

// Add Inventory Screen Styles (AddInventoryScreen.tsx, DetailsTab.tsx, PricingTab.tsx, ImagesTab.tsx)
export const styles = StyleSheet.create({
    tabContainer: { flex: 1, padding: 16 },
    label: { fontWeight: '500', marginBottom: 4 },
    required: { color: 'red' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 12, backgroundColor: '#fafafa', },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 12 },
    error: { color: 'red', marginBottom: 8 },
    imagePicker: { height: 150, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    imagePreview: { width: '100%', height: '100%', borderRadius: 8 },
    submitButton: { backgroundColor: '#FF700A', padding: 16, margin: 16, borderRadius: 8, alignItems: 'center' },
  });
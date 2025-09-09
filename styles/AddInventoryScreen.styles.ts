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
  smallButton: {
    marginLeft: 8,
    width: 28,
    height: 28,
    // backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#8E8E93',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButtonText: {
    color: "#8E8E93",
    fontSize: 16,
    fontWeight: "bold",
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pickerCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E4E4E7",
    borderRadius: 10
  },
  fieldView: {
    marginBottom: 16
  },
  imagePreviewSmall: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
});
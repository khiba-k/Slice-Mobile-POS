import LoadingPage from '@/components/shared/LoadingPage';
import { useToastStore } from '@/store/useToastStore';
import { useUserStore } from '@/store/useUserStore';
import { addInventory, addItemSchema } from '@/utils/AddInventoryScreen.utils';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import DetailsTab from './DetailsTab';
import ImagesTab from './ImagesTab';
import PricingTab from './PricingTab';

const AddInventoryScreen = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addItemSchema),
    defaultValues: {
      itemType: '',
      departmentName: '',
      name: '',
      description: '',
      unitSize: '',
      unitType: '',
      qtyAvailable: 0,
      lowStockAlertQty: '',
      sellingPrice: '',
      costPrice: '',
      markupPercentage: '',
      displayImage: null,
      otherImages: [],
    },
  });

  // State for low stock toggle
  const [lowStockEnabled, setLowStockEnabled] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedItemType, setSelectedItemType] = useState<string>('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [sellingPrice, setSellingPrice] = useState<string>('');
  const [costPrice, setCostPrice] = useState<string>('');
  const [markupPercentage, setMarkupPercentage] = useState<string>('');
  const { store } = useUserStore();
  const { showToast } = useToastStore();

  const [loading, setLoading] = useState(false);

  // Wizard step state
  const [step, setStep] = useState(0);

  const onSubmit = async (data: any) => {
    setLoading(true);
    addInventory(data, store, router, showToast);
    setLoading(false);
  };

  const onError = (errors: any) => {
    console.log('Validation errors:', errors);
    
    showToast(false, 'Missing Required Fields');
  };

  // Navigation handlers
  const goNext = () => {
    if (step < 2) setStep(step + 1);
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: '#FFFFFF',
              marginTop: 20,
            }}
          >
            <View style={{ width: '10%' }}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ padding: 8, marginLeft: -8 }}
              >
                <Ionicons name="chevron-back" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={{ width: '80%', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#000',
                  marginLeft: 8,
                }}
              >
                Add Inventory
              </Text>
            </View>
          </View>

          {/* Slide container: render all slides but hide inactive */}
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, display: step === 0 ? 'flex' : 'none' }}>
              <DetailsTab
                control={control}
                errors={errors}
                lowStockEnabled={lowStockEnabled}
                setLowStockEnabled={setLowStockEnabled}
                watch={watch}
                setValue={setValue}
                selectedItemType={selectedItemType}
                setSelectedItemType={setSelectedItemType}
                selectedDepartment={selectedDepartment}
                setSelectedDepartment={setSelectedDepartment}
              />
            </View>

            <View style={{ flex: 1, display: step === 1 ? 'flex' : 'none' }}>
              <PricingTab
                control={control}
                errors={errors}
                sellingPrice={sellingPrice}
                watch={watch}
                costPrice={costPrice}
                markupPercentage={markupPercentage}
                setSellingPrice={setSellingPrice}
                setCostPrice={setCostPrice}
                setMarkupPercentage={setMarkupPercentage}
              />
            </View>

            <View style={{ flex: 1, display: step === 2 ? 'flex' : 'none' }}>
              <ImagesTab control={control} />
            </View>
          </View>

          {/* Navigation chevrons */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: step === 0 ? 'flex-end' : 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 12,
            }}
          >
            {step > 0 && (
              <TouchableOpacity onPress={goBack}>
                <ChevronLeft size={40} color="#333" />
              </TouchableOpacity>
            )}

            {step < 2 ? (
              <TouchableOpacity onPress={goNext}>
                <ChevronRight size={40} color="#FF700A" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleSubmit(onSubmit, onError)}>
                <Check size={40} color="#FF700A" />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

export default AddInventoryScreen;

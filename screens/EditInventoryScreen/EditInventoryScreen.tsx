import LoadingPage from '@/components/shared/LoadingPage';
import { useEditItemStore } from '@/store/useEditItemStore';
import { useToastStore } from '@/store/useToastStore';
import { useUserStore } from '@/store/useUserStore';
import { addItemSchema, editInventory } from '@/utils/EditInventoryScreen.utils';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react-native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import DetailsTab from './DetailsTab';
import DiscardModal from './DiscardModal';
import ImagesTab from './ImagesTab';
import PricingTab from './PricingTab';
import SaveModal from './SaveModal';

const EditInventoryScreen = () => {
    const router = useRouter();
    const { clickedItem } = useEditItemStore();

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(addItemSchema),
        defaultValues: {
            itemType: clickedItem?.itemType,
            departmentName: clickedItem?.departmentName,
            name: clickedItem?.name,
            description: clickedItem?.description || '',
            unitSize: String(clickedItem?.unitSize) || '',
            unitType: String(clickedItem?.unitType) || '',
            qtyAvailable: clickedItem?.qtyAvailable || 0,
            lowStockAlertQty: String(clickedItem?.lowStockAlertQty) || '',
            sellingPrice: String(clickedItem?.sellingPrice) || '',
            costPrice: String(clickedItem?.costPrice) || '',
            markupPercentage: String(clickedItem?.markupPercentage) || '',
            displayImage: clickedItem?.images.find(i => i.isDisplayImage)
                ? {
                    id: clickedItem.images.find(i => i.isDisplayImage)!.id,
                    uri: clickedItem.images.find(i => i.isDisplayImage)!.url,
                    isDisplayImage: true,
                    new: false,
                }
                : null,
            otherImages: clickedItem?.images
                .filter(i => !i.isDisplayImage)
                .map(i => ({ id: i.id, uri: i.url, isDisplayImage: false, new: false })) || [],
        },
    });

    // State for low stock toggle
    const [lowStockEnabled, setLowStockEnabled] = useState(clickedItem?.lowStockAlertQty ? true : false);
    const [selectedDepartment, setSelectedDepartment] = useState<string>(clickedItem?.departmentName || '');
    const [selectedItemType, setSelectedItemType] = useState<string>(clickedItem?.itemType || '');
    const [sellingPrice, setSellingPrice] = useState<string>('');
    const [costPrice, setCostPrice] = useState<string>('');
    const [markupPercentage, setMarkupPercentage] = useState<string>('');
    const { store } = useUserStore();
    const { showToast } = useToastStore();
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [showSaveModal, setShowSaveModal] = useState(false);

    const [loading, setLoading] = useState(false);

    // Wizard step state
    const [step, setStep] = useState(0);

    const onSubmit = async (data: any) => {
        setLoading(true);
        await editInventory(data, clickedItem!.id, router, showToast);
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
                                onPress={() => {
                                    setShowDiscardModal(true)
                                }}
                                style={{ padding: 8, marginLeft: -8 }}
                            >
                                <Ionicons name="chevron-back" size={24} color="black" />
                            </TouchableOpacity>
                            <DiscardModal
                                showConfirm={showDiscardModal}
                                setShowConfirm={setShowDiscardModal}
                            />
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
                                Edit Inventory <Text style={{color: "#FF700A"}}>#{clickedItem?.itemNumber}</Text>
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
                            <TouchableOpacity onPress={() => setShowSaveModal(true)}>
                                <Check size={40} color="#FF700A" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <SaveModal
                        showSave={showSaveModal}
                        setShowSave={setShowSaveModal}
                        onSubmit={handleSubmit(onSubmit, onError)} />
                </>
            )}
        </View>
    );
};

export default EditInventoryScreen;

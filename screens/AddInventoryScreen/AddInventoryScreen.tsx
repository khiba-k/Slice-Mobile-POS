import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import DetailsTab from './DetailsTab';
import ImagesTab from './ImagesTab';
import PricingTab from './PricingTab';
// import { getItemTypeDepartments, getUnitTypes } from '@/lib/services/inventory.services';

const AddInventoryScreen = () => {
  const router = useRouter();
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      itemType: '',
      departmentName: '',
      name: '',
      description: '',
      unitSize: '',
      unitType: '',
      qtyAvailable: '',
      lowStockAlertQty: '',
      sellingPrice: '',
      costPrice: '',
      markupPercentage: '',
      displayImage: null,
      otherImages: [],
    }
  });

  // State for low stock toggle
  const [lowStockEnabled, setLowStockEnabled] = useState(false);

  // State for dropdown data
  const [itemTypeDepartments, setItemTypeDepartments] = useState<{ itemType: string; departmentName: string }[]>([]);
  const [unitTypes, setUnitTypes] = useState<{ name: string }[]>([]);

  // Fetch data when screen mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const types = await getItemTypeDepartments(); // fetch from ItemTypeDepartment table
        // setItemTypeDepartments(types || []);

        // const units = await getUnitTypes(); // fetch store-specific unitTypes
        // setUnitTypes(units || []);
      } catch (err) {
        console.error('Error fetching inventory data:', err);
      }
    };
    fetchData();
  }, []);

  // Tab state
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'details', title: 'Details' },
    { key: 'pricing', title: 'Pricing' },
    { key: 'images', title: 'Images' },
  ]);

  // Scenes for TabView
  const renderScene = SceneMap({
    details: () => (
      <DetailsTab
        control={control}
        errors={errors}
        itemTypeDepartments={itemTypeDepartments}
        unitTypes={unitTypes}
        lowStockEnabled={lowStockEnabled}
        setLowStockEnabled={setLowStockEnabled}
        watch={watch}
        setValue={setValue}
      />
    ),
    pricing: () => <PricingTab control={control} />,
    images: () => <ImagesTab control={control} />,
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    // call your API to create item here
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        marginTop: 20
      }}>
        <View style={{ width: '10%' }}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => {
              router.back()
            }}
            style={{
              padding: 8,
              marginLeft: -8, // Align with screen edge
            }}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
        </View>


        <View style={{ width: '80%', alignItems: 'center' }}>
          {/* Title */}
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#000',
            marginLeft: 8,
          }}>
            Add Inventory
          </Text>

        </View>

      </View>
      {/* Form Tab */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 400 }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: 'transparent',
              height: 3,
              borderRadius: 2,
              alignItems: 'center',
              marginLeft: 40,
            }}
            style={{
              backgroundColor: '#F2F2F7',
              elevation: 1,
              shadowOpacity: 0,
              marginHorizontal: 20,
              alignItems: 'center',
              borderRadius: 12,
              height: 44,
              marginTop: 15,
            }}
            activeColor="#FF700A"
            inactiveColor="#8E8E93"
            tabStyle={{
              width: 'auto',
              minWidth: 80,
              marginHorizontal: 10,
            }}
            pressColor="rgba(255, 112, 10, 0.1)"
          />
        )}
      />
    </View>
  );
};

export default AddInventoryScreen;

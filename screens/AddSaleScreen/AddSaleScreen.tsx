import LoadingPage from '@/components/shared/LoadingPage';
import { useToastStore } from '@/store/useToastStore';
import { useUserStore } from '@/store/useUserStore';
import { SalesItemType } from '@/utils/AddSalesScreen.utils';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DiscardModal from './DiscardModal';
import InventorySearch from './InventorySearch';
import RenderSaleItems from './RenderSaleItems';
import SummaryFooter from './SummaryFooter';
import SummaryModal from './SummaryModal';

export interface CreateSaleItemInput {
  itemId: string;
  quantity: number;
}

export interface CreateSaleInput {
  storeId: string;
  cashierId?: string;
  name?: string;
  saleNumber: string;
  status: 'DRAFT' | 'COMPLETED';
  paymentMethod: 'cash' | 'mpesa' | 'ecocash' | 'card';
  items: CreateSaleItemInput[];
  discountAmount?: number;
}

const AddSaleScreen = () => {
  const { store, profile } = useUserStore();
  const { showToast } = useToastStore();

  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [saleItems, setSaleItems] = useState<SalesItemType[]>([]);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const [saleName, setSaleName] = useState('');

  const subtotal = useMemo(
    () => saleItems.reduce((acc, item) => acc + item.totalPrice, 0),
    [saleItems]
  );

  const total = subtotal - discountValue;

  const handleSubmit = (paymentMethod: 'cash' | 'mpesa' | 'ecocash' | 'card') => {
    const saleData: CreateSaleInput = {
      storeId: store!.id,
      cashierId: profile!.userId,
      name: saleName || undefined,
      saleNumber: `SALE-${Date.now()}`,
      status: 'COMPLETED',
      paymentMethod,
      items: saleItems.map(item => ({
        itemId: item.id,
        quantity: item.quantity
      })),
      discountAmount: discountValue > 0 ? discountValue : undefined
    };

    console.log('Submitting sale:', saleData);
    setShowSummaryModal(false);
    // TODO: call API to submit sale
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {false ? (
        <LoadingPage />
      ) : (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 12,
              marginTop: 20,
            }}
          >
            <View style={{ width: '10%' }}>
              <TouchableOpacity
                onPress={() => setShowDiscardModal(true)}
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
              <Text style={{ fontSize: 18, fontWeight: '600', marginLeft: 8 }}>
                New Sale
              </Text>
            </View>
          </View>

          {/* Body + Footer */}
          <View style={{ flex: 1 }}>
            {/* Scrollable body */}
            <View style={{ flex: 1 }}>
              <InventorySearch setSaleItems={setSaleItems} />
              <RenderSaleItems saleItems={saleItems} setSaleItems={setSaleItems} />
            </View>

            {/* Fixed footer */}
            <SummaryFooter
              saleItems={saleItems}
              subtotal={subtotal}
              discountPercent={discountPercent}
              discountValue={discountValue}
              setDiscountPercent={setDiscountPercent}
              setDiscountValue={setDiscountValue}
              onProceed={() => setShowSummaryModal(true)}
            />

            {/* Summary Modal */}
            <SummaryModal
              visible={showSummaryModal}
              onClose={() => setShowSummaryModal(false)}
              saleItems={saleItems}
              subtotal={subtotal}
              discountAmount={discountValue}
              discountPercent={discountPercent}
              total={total}
              saleName={saleName}
              setSaleName={setSaleName}
              onSelectPayment={handleSubmit}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default AddSaleScreen;

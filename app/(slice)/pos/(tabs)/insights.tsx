import FabMenu from '@/components/shared/FabMenu';
import InsightsScreen from '@/screens/InsightsScreen/InsightsScreen';
import { useUserStore } from '@/store/useUserStore';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';


const index = () => {
  const { profile, store, clearUser } = useUserStore();
  const [type, setType] = useState<'Inventory' | 'Sales'>('Inventory');

  return (
    <View style={styles.container}>
      <InsightsScreen 
      type={type}
      setType={setType}
      />
      <FabMenu />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

})
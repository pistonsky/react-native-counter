import React from 'react';
import { View, StyleSheet } from 'react-native';

import NumericInput from 'app/components/NumericInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECECEC',
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <NumericInput key="EURUSD" min={1.0759} max={1.2759} digits={4} step={0.0001} initialValue={1.1759} />
      <NumericInput key="GBPUSD" min={1.1934} max={1.3934} digits={4} step={0.0001} initialValue={1.2934} />
    </View>
  );
};

export default App;

import React, { useRef } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';

import NumericInput from 'app/components/NumericInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECECEC',
  },
  section: {
    flexDirection: 'row',
    margin: 20,
  },
  block: {
    alignItems: 'center',
    margin: 10,
  },
  sectionTitle: {
    fontSize: 20,
    textAlign: 'center',
  },
  buttons: {
    flex: 0.5,
    justifyContent: 'space-between',
  },
});

const App = () => {
  const EURUSDsl = useRef(null);
  const EURUSDtp = useRef(null);
  const GBPUSDsl = useRef(null);
  const GBPUSDtp = useRef(null);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>EURUSD</Text>
      <View style={styles.section}>
        <View style={styles.block}>
          <Text>Stop Loss</Text>
          <NumericInput
            min={1.0759}
            max={1.2759}
            digits={4}
            step={0.0001}
            initialValue={1.1759 - 0.01}
            textInputRef={EURUSDsl}
          />
        </View>
        <View style={styles.block}>
          <Text>Take Profit</Text>
          <NumericInput
            min={1.0759}
            max={1.2759}
            digits={4}
            step={0.0001}
            initialValue={1.1759 + 0.01}
            textInputRef={EURUSDtp}
          />
        </View>
      </View>
      <Text style={styles.sectionTitle}>GBPUSD</Text>
      <View style={styles.section}>
        <View style={styles.block}>
          <Text>Stop Loss</Text>
          <NumericInput
            min={1.1934}
            max={1.3934}
            digits={4}
            step={0.0001}
            initialValue={1.2934 - 0.01}
            textInputRef={GBPUSDsl}
          />
        </View>
        <View style={styles.block}>
          <Text>Take Profit</Text>
          <NumericInput
            min={1.1934}
            max={1.3934}
            digits={4}
            step={0.0001}
            initialValue={1.2934 + 0.01}
            textInputRef={GBPUSDtp}
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <Button title="Focus EURUSD Stop Loss" onPress={() => EURUSDsl.current.focus()} />
        <Button title="Focus EURUSD Take Profit" onPress={() => EURUSDtp.current.focus()} />
        <Button title="Focus GBPUSD Stop Loss" onPress={() => GBPUSDsl.current.focus()} />
        <Button title="Focus GBPUSD Take Profit" onPress={() => GBPUSDtp.current.focus()} />
      </View>
    </View>
  );
};

export default App;

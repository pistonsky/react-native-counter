import React, { useRef, useState } from 'react';
import { View, StyleSheet, Button, Text, Platform } from 'react-native';

import NumericInput from 'app/components/NumericInput';

const MARGIN = 0.008;

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
  const [EURUSDsl, setEURUSDsl] = useState(1.1759 - 0.01);
  const [EURUSDtp, setEURUSDtp] = useState(1.1759 + 0.01);
  const [GBPUSDsl, setGBPUSDsl] = useState(1.2934 - 0.01);
  const [GBPUSDtp, setGBPUSDtp] = useState(1.2934 + 0.01);

  const EURUSDslRef = useRef(null);
  const EURUSDtpRef = useRef(null);
  const GBPUSDslRef = useRef(null);
  const GBPUSDtpRef = useRef(null);

  return (
    <View
      style={styles.container}
      onTouchStart={() => {
        if (Platform.OS === 'ios') {
          EURUSDslRef.current.blur();
          EURUSDtpRef.current.blur();
          GBPUSDslRef.current.blur();
          GBPUSDtpRef.current.blur();
        }
      }}
    >
      <Text style={styles.sectionTitle}>EURUSD</Text>
      <View style={styles.section}>
        <View style={styles.block}>
          <Text>Stop Loss</Text>
          <NumericInput
            min={1.0759}
            max={EURUSDtp - MARGIN}
            digits={4}
            step={0.0001}
            initialValue={EURUSDsl}
            onChange={setEURUSDsl}
            textInputRef={EURUSDslRef}
          />
        </View>
        <View style={styles.block}>
          <Text>Take Profit</Text>
          <NumericInput
            min={EURUSDsl + MARGIN}
            max={1.2759}
            digits={4}
            step={0.0001}
            initialValue={EURUSDtp}
            onChange={setEURUSDtp}
            textInputRef={EURUSDtpRef}
          />
        </View>
      </View>
      <Text style={styles.sectionTitle}>GBPUSD</Text>
      <View style={styles.section}>
        <View style={styles.block}>
          <Text>Stop Loss</Text>
          <NumericInput
            min={1.1934}
            max={GBPUSDtp - MARGIN}
            digits={4}
            step={0.0001}
            initialValue={GBPUSDsl}
            onChange={setGBPUSDsl}
            textInputRef={GBPUSDslRef}
          />
        </View>
        <View style={styles.block}>
          <Text>Take Profit</Text>
          <NumericInput
            min={GBPUSDsl + MARGIN}
            max={1.3934}
            digits={4}
            step={0.0001}
            initialValue={GBPUSDtp}
            onChange={setGBPUSDtp}
            textInputRef={GBPUSDtpRef}
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <Button title="Focus EURUSD Stop Loss" onPress={() => EURUSDslRef.current.focus()} />
        <Button title="Focus EURUSD Take Profit" onPress={() => EURUSDtpRef.current.focus()} />
        <Button title="Focus GBPUSD Stop Loss" onPress={() => GBPUSDslRef.current.focus()} />
        <Button title="Focus GBPUSD Take Profit" onPress={() => GBPUSDtpRef.current.focus()} />
      </View>
    </View>
  );
};

export default App;

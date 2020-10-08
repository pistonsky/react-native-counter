import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableHighlight } from 'react-native';

import DecreaseIcon from './DecreaseIcon';
import IncreaseIcon from './IncreaseIcon';

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  leftButton: {
    width: 40,
    height: 40,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C4C4C4',
  },
  rightButton: {
    width: 40,
    height: 40,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C4C4C4',
  },
  disabled: {
    backgroundColor: '#E3E3E3',
  },
  textInput: {
    flex: 1,
  },
});

const format = (number, digits) => {
  let normalized = number;
  for (let i = 1; i <= digits; i++) {
    normalized *= 10;
  }
  normalized = Math.round(normalized);
  for (let i = 1; i <= digits; i++) {
    normalized /= 10;
  }
  return normalized.toFixed(digits);
}

const checkMinMax = (number, min, max) => {
  if (number > max) {
    return max;
  }
  if (number < min) {
    return min;
  }
  return number;
};

const NumericInput = ({
  min = 0,
  max = 100,
  digits = 0,
  step = 1,
  initialValue = 1,
  onChange = () => {},
  textInputRef,
  style,
  ...props
}) => {
  min = parseFloat(format(min, digits));
  max = parseFloat(format(max, digits));
  const checkedInitialValue = checkMinMax(initialValue, min, max);
  const formattedInitialValue = format(checkedInitialValue, digits);
  const [value, setValue] = useState(formattedInitialValue);
  const valueFloat = useRef(checkedInitialValue);
  const continuallyDecreasing = useRef(0);
  const continuallyIncreasing = useRef(0);
  const speedUpTimeout = useRef(null);

  useEffect(() => {
    setValue((prevValue) => format(checkMinMax(parseFloat(prevValue), min, max), digits));
  }, [min, max, digits]);

  const onDecrease = useCallback((fireOnChange = true) => {
    const newValue = checkMinMax(valueFloat.current - step, min, max);
    valueFloat.current = newValue;
    setValue(format(newValue, digits));
    if (fireOnChange) {
      onChange(newValue);
    }
  }, [onChange, digits, min, max]);

  const onIncrease = useCallback((fireOnChange = true) => {
    const newValue = checkMinMax(valueFloat.current + step, min, max);
    valueFloat.current = newValue;
    setValue(format(newValue, digits));
    if (fireOnChange) {
      onChange(newValue);
    }
  }, [onChange, digits, min, max]);

  const scheduleDecrease = useCallback(() => {
    if (continuallyDecreasing.current) {
      onDecrease(false);
      setTimeout(scheduleDecrease, continuallyDecreasing.current);
    }
  }, [onChange, digits, min, max]);

  const scheduleIncrease = useCallback(() => {
    if (continuallyIncreasing.current) {
      onIncrease(false);
      setTimeout(scheduleIncrease, continuallyIncreasing.current);
    }
  }, [onChange, digits, min, max]);

  const onDecreasePressIn = useCallback(() => {
    continuallyDecreasing.current = 100;
    setTimeout(() => {
      scheduleDecrease();
    }, 300);
    speedUpTimeout.current = setTimeout(() => {
      continuallyDecreasing.current = 10; // speed up
    }, 2000);
  }, [onChange, digits, min, max]);

  const onIncreasePressIn = useCallback(() => {
    continuallyIncreasing.current = 100;
    setTimeout(() => {
      scheduleIncrease();
    }, 300);
    speedUpTimeout.current = setTimeout(() => {
      continuallyIncreasing.current = 10; // speed up
    }, 2000);
  }, [onChange, digits, min, max]);

  const onDecreasePressOut = useCallback(() => {
    if (speedUpTimeout.current) {
      clearTimeout(speedUpTimeout.current);
      speedUpTimeout.current = null;
    }
    continuallyDecreasing.current = 0;
    onChange(valueFloat.current);
  }, []);

  const onIncreasePressOut = useCallback(() => {
    if (speedUpTimeout.current) {
      clearTimeout(speedUpTimeout.current);
      speedUpTimeout.current = null;
    }
    continuallyIncreasing.current = 0;
    onChange(valueFloat.current);
  }, []);

  const onChangeText = useCallback((text) => {
    text = text.replace(/[\-\s]/, '');
    text = text.replace(',', '.');
    setValue(text);
  }, []);

  const onEndEditing = useCallback((event) => {
    const newFloat = checkMinMax(parseFloat(event.nativeEvent.text), min, max);
    const newValue = format(newFloat, digits);
    valueFloat.current = parseFloat(newValue);
    onChange(valueFloat.current);
    setValue(newValue);
  }, []);

  const leftDisabled = parseFloat(value) <= min + step / 2;
  const rightDisabled = parseFloat(value) >= max - step / 2;

  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.leftButton} disabled={leftDisabled} onPress={onDecrease} onPressIn={onDecreasePressIn} onPressOut={onDecreasePressOut}>
        <View style={[styles.leftButton, leftDisabled && styles.disabled]}>
          <DecreaseIcon />
        </View>
      </TouchableHighlight>
      <TextInput
        ref={textInputRef}
        style={[styles.textInput, style]}
        value={value}
        keyboardType="numeric"
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        textAlign="center"
        { ...props }
      />
      <TouchableHighlight style={styles.rightButton} disabled={rightDisabled} onPress={onIncrease} onPressIn={onIncreasePressIn} onPressOut={onIncreasePressOut}>
        <View style={[styles.rightButton, rightDisabled && styles.disabled]}>
          <IncreaseIcon />
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default NumericInput;

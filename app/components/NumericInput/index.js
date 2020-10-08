import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, Platform, TouchableNativeFeedback, TouchableHighlight } from 'react-native';

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
  const [value, setValue] = useState(format(checkMinMax(initialValue, min, max), digits));
  const continuallyDecreasing = useRef(0);
  const continuallyIncreasing = useRef(0);
  const speedUpTimeout = useRef(null);

  useEffect(() => {
    setValue((prevValue) => format(checkMinMax(parseFloat(prevValue), min, max), digits));
  }, [min, max, digits]);

  const onDecrease = useCallback(() => {
    setValue((prevValue) => {
      const newValue = checkMinMax(parseFloat(prevValue) - step, min, max);
      onChange(newValue);
      return format(newValue, digits);
    });
  }, [onChange, digits]);

  const onIncrease = useCallback(() => {
    setValue((prevValue) => {
      const newValue = checkMinMax(parseFloat(prevValue) + step, min, max);
      onChange(newValue);
      return format(newValue, digits);
    });
  }, [onChange, digits]);

  const scheduleDecrease = () => {
    if (continuallyDecreasing.current) {
      onDecrease();
      setTimeout(scheduleDecrease, continuallyDecreasing.current);
    }
  }

  const scheduleIncrease = () => {
    if (continuallyIncreasing.current) {
      onIncrease();
      setTimeout(scheduleIncrease, continuallyIncreasing.current);
    }
  }

  const onDecreasePressIn = useCallback(() => {
    continuallyDecreasing.current = 100;
    setTimeout(() => {
      scheduleDecrease();
    }, 300);
    speedUpTimeout.current = setTimeout(() => {
      continuallyDecreasing.current = 10; // speed up
    }, 2000);
  }, [onChange, digits]);

  const onIncreasePressIn = useCallback(() => {
    continuallyIncreasing.current = 100;
    setTimeout(() => {
      scheduleIncrease();
    }, 300);
    speedUpTimeout.current = setTimeout(() => {
      continuallyIncreasing.current = 10; // speed up
    }, 2000);
  }, [onChange, digits]);

  const onDecreasePressOut = useCallback(() => {
    clearTimeout(speedUpTimeout.current);
    continuallyDecreasing.current = 0;
  }, []);

  const onIncreasePressOut = useCallback(() => {
    clearTimeout(speedUpTimeout.current);
    continuallyIncreasing.current = 0;
  }, []);

  const onChangeText = useCallback((text) => {
    text = text.replace(/[\-\s]/, '');
    setValue(text);
  }, []);

  const onEndEditing = useCallback((event) => {
    const newFloat = checkMinMax(parseFloat(event.nativeEvent.text), min, max);
    const newValue = format(newFloat, digits);
    onChange(parseFloat(newValue));
    setValue(newValue);
  }, []);

  const Touchable = Platform.OS === 'ios' ? TouchableHighlight : TouchableNativeFeedback;

  return (
    <View style={styles.container}>
      <Touchable onPress={onDecrease} onPressIn={onDecreasePressIn} onPressOut={onDecreasePressOut}>
        <View style={styles.leftButton}>
          <DecreaseIcon />
        </View>
      </Touchable>
      <TextInput
        style={[styles.textInput, style]}
        value={value}
        keyboardType="numeric"
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        textAlign="center"
        { ...props }
      />
      <Touchable onPress={onIncrease} onPressIn={onIncreasePressIn} onPressOut={onIncreasePressOut}>
        <View style={styles.rightButton}>
          <IncreaseIcon />
        </View>
      </Touchable>
    </View>
  );
};

export default NumericInput;

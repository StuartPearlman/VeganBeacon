import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

export default function ZipInput({ value, onChangeText }) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Enter your ZIP Code"
      textContentType="postalCode"
      keyboardType="numeric"
      maxLength={5}
      returnKeyType="search"
    />
  );
}

ZipInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

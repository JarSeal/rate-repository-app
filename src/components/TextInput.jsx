import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    padding: 6,
    marginBottom: 10,
  },
  errorBorders: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    style,
    styles.input,
    error && styles.errorBorders
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
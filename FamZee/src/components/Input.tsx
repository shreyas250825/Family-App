import React from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export default function Input({ placeholder, value, onChangeText, secureTextEntry, error, autoCapitalize = 'sentences' }: InputProps) {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        style={[styles.input, error && styles.inputError]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#E11D48',
  },
  errorText: {
    color: '#E11D48',
    fontSize: 12,
    marginBottom: 8,
  },
});

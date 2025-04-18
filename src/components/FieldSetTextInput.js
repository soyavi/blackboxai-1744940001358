/**

 A reusable component for a text input field with a label and optional error message.
 @param {string} value - The current value of the text input field.
 @param {string} placeholder - The placeholder text to display in the field when it is empty.
 @param {string} name - The label text to display above the field.
 @param {boolean} error - Whether there is an error with the field.
 @param {string} errorString - The error message to display when there is an error.
 @param {function} onChangeText - Function to call when the text input changes.
 @param {boolean} secureTextEntry - Whether the text input should be masked for password entry.
 @param {function} onPress - Function to call when the field is pressed.
 @param {object} style - Additional styling for the field container.
 @param {object} textStyle - Additional styling for the text input.
 @returns A component displaying a text input field with label and error message.
 */

import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import css from '../Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FieldSetTextInput = ({
  value = '',
  placeholder = 'Placeholder',
  name,
  error = false,
  errorString = 'Error',
  onChangeText,
  secureTextEntry = false,
  onPress,
  style,
  textStyle,
  ...props
}) => {
  const styles = css();
  const [isPassword, setIsPassword] = useState(secureTextEntry);

  if (name === undefined) {
    name = placeholder;
  }
  return (
    <>
      <View
        style={{
          borderWidth: value.length > 0 ? 2 : 1,
          borderColor: error
            ? '#F09696'
            : value.length > 0
            ? '#3DBA71'
            : 'gray',
          borderRadius: 24,
          height: 48,
          paddingLeft: 16,
          paddingRight: 16,
          justifyContent: 'center',
        }}>
        {value.length > 0 && (
          <View
            style={{
              position: 'absolute',
              left: 16,
              top: -9,
              height: 18,
              paddingHorizontal: 4,
              backgroundColor: styles.bgMainColor,
            }}>
            <Text
              style={{
                lineHeight: 18,
                fontWeight: '500',
                color: error
                  ? '#B96363'
                  : value.length > 0
                  ? '#3DBA71'
                  : '#8692A6',
              }}>
              {name}
            </Text>
          </View>
        )}
        <TextInput
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: styles.textNormalColor,
          }}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor={'gray'}
          underlineColorAndroid="rgba(0,0,0,0)"
          value={value}
          secureTextEntry={isPassword}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPassword(!isPassword)}
            style={{
              position: 'absolute',
              right: 16,
            }}>
            <Ionicons
              name={isPassword ? 'eye-outline' : 'eye-off-outline'}
              size={24}
              color={styles.textSecondaryColor}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text
          style={{
            color: '#B96363',
            marginTop: 4,
            marginLeft: 16,
          }}>
          {errorString}
        </Text>
      )}
    </>
  );
};

export default FieldSetTextInput;

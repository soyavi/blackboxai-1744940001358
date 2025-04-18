import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import API from '../../helpers/Axios';
import FieldSetTextInput from '../../components/FieldSetTextInput';
import {useTheme} from '@react-navigation/native';
import AuthNav from './AuthNav';
import css from '../../Styles';
import {useTranslation} from 'react-i18next';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const VerifyCellSize = 4;

const ResetPasswordScreen = ({navigation, route, dispatch}) => {
  const {t} = useTranslation();
  const {colors, dark} = useTheme();
  const styles = css();
  const [code, setCode] = useState({
    value: '',
    error: false,
    errorString: null,
  });
  const [value, setValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: VerifyCellSize});
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setCode({
      value: value,
      error: false,
      errorString: code.errorString,
    });
    if (value.length === VerifyCellSize) {
      onSubmit(value);
    }
  }, [value]);

  const onSubmit = () => {
    if (isSubmitting) {
      return;
    }

    API.post('verify-forgot-code', {
      email: route.params?.email,
      code: value,
    })
      .then(res => {
        setIsSubmitting(false);
        navigation.replace('SetNewPasswordScreen', {
          email: route.params?.email,
          code: value,
        });
      })
      .catch(error => {
        setInvalid(true);
        setIsSubmitting(false);
        setCode({
          value: code.value,
          error: error.response.data.errors.code !== undefined,
          errorString:
            error.response.data.errors.code !== undefined
              ? error.response.data.errors.code[0]
              : 'Error',
        });
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={[styles.px4, styles.flexGrow1]}>
      <AuthNav />
      <ScrollView
        style={[styles.px5]}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="handled">
        <Text
          style={[
            styles.textNormal,
            styles.fs1,
            styles.fwBold,
            styles.textCenter,
            styles.mb5,
          ]}>
          {t('Enter code to reset password')}
        </Text>
        <Text
          style={[
            styles.textNormal,
            styles.textSecondary,
            styles.textCenter,
            styles.mb5,
          ]}>
          We have emailed you a code to to reset your password, please check
          your mail box.
        </Text>
        <View
          style={{
            marginTop: 12,
          }}>
          <View>
            <CodeField
              autoFocus={true}
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={value => {
                setValue(value);
                setInvalid(false);
              }}
              cellCount={VerifyCellSize}
              rootStyle={[styles.mb5]}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  key={index}
                  onLayout={getCellOnLayoutHandler(index)}
                  style={[
                    {
                      width: 48,
                      height: 60,
                      overflow: 'hidden',
                      borderBottomWidth: 2,
                      borderBottomColor: invalid
                        ? styles.textDangerColor
                        : dark
                        ? '#353739'
                        : '#EBE8E7',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    isFocused && styles.borderLight,
                  ]}>
                  <Text
                    key={index}
                    style={{
                      fontWeight: '600',
                      lineHeight: 60,
                      fontSize: 34,
                      textAlign: 'center',
                      color: invalid
                        ? styles.textDangerColor
                        : styles.textNormalColor,
                    }}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            {code.error && (
              <Text style={[styles.textDanger, styles.textCenter]}>
                {code.errorString}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

ResetPasswordScreen.propTypes = {
  navigation: PropTypes.object,
};

export default connect(({auth}) => ({auth}))(ResetPasswordScreen);

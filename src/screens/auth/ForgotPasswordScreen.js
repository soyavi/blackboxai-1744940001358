import React, {useState} from 'react';
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
import AuthNav from './AuthNav';
import css from '../../Styles';
import {useTranslation} from 'react-i18next';

const ForgotPasswordScreen = ({navigation, colors, route}) => {
  const {t} = useTranslation();
  const styles = css();
  const [email, setEmail] = useState({
    value: route.params?.email || '',
    error: false,
    errorString: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = () => {
    if (isSubmitting) {
      return;
    }
    API.post('reset-password/send', {
      email: email.value,
    })
      .then(res => {
        setIsSubmitting(false);
        navigation.navigate('ResetPasswordScreen', {email: email.value});
      })
      .catch(error => {
        setIsSubmitting(false);
        setEmail({
          value: email.value,
          error: error.response.data.errors.email !== undefined,
          errorString:
            error.response.data.errors.email !== undefined
              ? error.response.data.errors.email[0]
              : 'Error',
        });
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={[styles.bgMain, styles.flexGrow1]}>
      <AuthNav />

      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            padding: 24,
            width: '100%',
          }}>
          <Text
            style={[
              styles.textCenter,
              styles.textNormal,
              styles.fs1,
              styles.fwBold,
              styles.mb5,
            ]}>
            {t('Reset your password')}
          </Text>
          <Text style={[styles.textNormal, styles.textCenter, styles.mb5]}>
            Enter the email address associated with your account and we'll send
            you a code to reset your password.
          </Text>
          <View
            style={{
              marginTop: 12,
            }}>
            <View>
              <FieldSetTextInput
                placeholder={'Email'}
                value={email.value}
                error={email.error}
                errorString={email.errorString}
                onChangeText={text => {
                  setEmail({
                    value: text,
                    error: false,
                    errorString: null,
                  });
                }}
                autoCapitalize={'none'}
                blurOnSubmit={true}
                onSubmitEditing={onSubmit}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsSubmitting(true);
              onSubmit();
            }}
            style={[
              styles.btn,
              styles.btnBlock,
              styles.btnPrimary,
              styles.btnCircleRounded,
              styles.mt5,
            ]}>
            {isSubmitting && <ActivityIndicator color={'white'} />}
            {!isSubmitting && (
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '600',
                }}>
                {t('Continue')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

ForgotPasswordScreen.propTypes = {
  navigation: PropTypes.object,
};

export default connect(({auth}) => ({auth}))(ForgotPasswordScreen);

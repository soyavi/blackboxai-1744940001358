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
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNav from './AuthNav';
import {useTranslation} from 'react-i18next';
import css from '../../Styles';

const SetNewPasswordScreen = ({navigation, route, dispatch}) => {
  const {t} = useTranslation();
  const styles = css();

  const [password, setPassword] = useState({
    value: '',
    error: false,
    errorString: null,
  });
  const [passwordConfirm, setPasswordConfirm] = useState({
    value: '',
    error: false,
    errorString: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = () => {
    if (isSubmitting) {
      return;
    }

    console.log({
      email: route.params?.email,
      code: route.params?.code,
      password: password.value,
      password_confirmation: passwordConfirm.value,
    });
    API.post('set-new-password', {
      email: route.params?.email,
      code: route.params?.code,
      password: password.value,
      password_confirmation: passwordConfirm.value,
    })
      .then(res => {
        setIsSubmitting(false);
        AsyncStorage.setItem('access_token', res.data.access_token);
        dispatch({type: 'AUTH_CHANGE', user: res.data.user});
        dispatch({
          type: 'ACCESS_TOKEN_CHANGE',
          accessToken: res.data.access_token,
        });
      })
      .catch(error => {
        setIsSubmitting(false);
        setPassword({
          value: password.value,
          error: error.response.data.errors.password !== undefined,
          errorString:
            error.response.data.errors.password !== undefined
              ? error.response.data.errors.password[0]
              : 'Error',
        });
        setPasswordConfirm({
          value: passwordConfirm.value,
          error: error.response.data.errors.comfirm_password !== undefined,
          errorString:
            error.response.data.errors.comfirm_password !== undefined
              ? error.response.data.errors.comfirm_password[0]
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
        <View style={{}}>
          <Text
            style={[
              styles.textNormal,
              styles.fs1,
              styles.fwBold,
              styles.textCenter,
              styles.mb5,
            ]}>
            Set your new password
          </Text>
          <Text
            style={[
              styles.textNormal,
              styles.textSecondary,
              styles.textCenter,
              styles.mb5,
            ]}>
            You now can set your new password, make it secured!
          </Text>
          <View
            style={{
              marginTop: 12,
            }}>
            <View>
              <FieldSetTextInput
                placeholder={'Password'}
                value={password.value}
                error={password.error}
                errorString={password.errorString}
                onChangeText={text => {
                  setPassword({
                    value: text,
                    error: false,
                    errorString: password.errorString,
                  });
                }}
                secureTextEntry={true}
              />
            </View>
            <Text
              style={{
                marginTop: 8,
                color: '#AFABAC',
              }}>
              Password needs 8 characters, both uppercase and lowercase letters
              and at least one symbol.
            </Text>
            <View
              style={{
                marginTop: 24,
              }}>
              <FieldSetTextInput
                placeholder={'Confirm password'}
                value={passwordConfirm.value}
                error={password.error}
                errorString={null}
                onChangeText={text => {
                  setPasswordConfirm({
                    value: text,
                    error: false,
                    errorString: null,
                  });
                }}
                secureTextEntry={true}
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

SetNewPasswordScreen.propTypes = {
  navigation: PropTypes.object,
};

export default connect(({auth}) => ({auth}))(SetNewPasswordScreen);

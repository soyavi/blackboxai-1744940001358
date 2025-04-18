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
import css from '../../Styles';
import {useTranslation} from 'react-i18next';

const PasswordScreen = ({navigation, route, dispatch, colors}) => {
  const styles = css();
  const {t} = useTranslation();

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

    API.post('auth/signup', {
      email: route.params?.email,
      name: route.params?.name,
      password: password.value,
      password_confirmation: passwordConfirm.value,
    })
      .then(res => {
        AsyncStorage.setItem('access_token', res.data.access_token);
        dispatch({
          type: 'ACCESS_TOKEN_CHANGE',
          accessToken: res.data.access_token,
        });
        setTimeout(() => {
          API.post('auth/user').then(res => {
            setIsSubmitting(false);
            dispatch({type: 'AUTH_CHANGE', user: res.data});
          });
        }, 100);
      })
      .catch(error => {
        console.log(error.response.data);
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
        <View>
          <Text
            style={[
              styles.textNormal,
              styles.fs1,
              styles.fwBold,
              styles.textCenter,
              styles.mb5,
            ]}>
            {t('Set your password')}
          </Text>
          <Text style={[styles.textSecondary, styles.textCenter]}>
            {t('Make it secured!')}
          </Text>
          <View style={[styles.mt4]}>
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
            <Text style={[styles.textSecondary, styles.mt3]}>
              {t(
                'Password needs 8 characters, both uppercase and lowercase letters and at least one symbol.',
              )}
            </Text>
            <View
              style={{
                marginTop: 24,
              }}>
              <FieldSetTextInput
                placeholder={t('Confirm password')}
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

PasswordScreen.propTypes = {
  navigation: PropTypes.object,
};

export default connect(({auth}) => ({auth}))(PasswordScreen);

import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import API from '../../helpers/Axios';
import FieldSetTextInput from '../../components/FieldSetTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../store/configureStore';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '@react-navigation/native';
import AuthNav from './AuthNav';
import Settings from '../../config/Settings';
import css from '../../Styles';
import {useTranslation} from 'react-i18next';

const SignInScreen = ({navigation, route, auth, colors}) => {
  const styles = css();
  const {t} = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState({
    value: route.params?.email || '',
    error: false,
    errorString: null,
  });

  const [password, setPassword] = useState({
    value: '',
    error: false,
    errorString: null,
  });

  const onSubmit = code => {
    if (isSubmitting) {
      return;
    }

    const loginData = {
      email: email.value,
      password: password.value,
      remember_me: 1,
    };

    API.post('auth/login', loginData)
      .then(res => {
        AsyncStorage.setItem('access_token', res.data.access_token);
        store.dispatch({
          type: 'ACCESS_TOKEN_CHANGE',
          accessToken: res.data.access_token,
        });
        setTimeout(() => {
          API.post('auth/user').then(res => {
            store.dispatch({type: 'AUTH_CHANGE', user: res.data});
            setTimeout(() => {
              navigation.getParent()?.goBack();
            }, 100);
          });
        }, 100);
      })
      .catch(error => {
        console.log(error.response);
        setIsSubmitting(false);
        setEmail({
          value: email.value,
          error: error.response.data.errors.email !== undefined,
          errorString:
            error.response.data.errors.email !== undefined
              ? error.response.data.errors.email[0]
              : 'Error',
        });
        setPassword({
          value: password.value,
          error: error.response.data.errors.password !== undefined,
          errorString:
            error.response.data.errors.password !== undefined
              ? error.response.data.errors.password[0]
              : 'Error',
        });
        if (
          error.response.data.errors.email === undefined &&
          error.response.data.errors.password === undefined
        ) {
          setEmail({
            value: email.value,
            error: true,
            errorString: 'These credentials do not match our records.',
          });
          setPassword({
            value: password.value,
            error: true,
            errorString: '',
          });
        }
      });
  };

  const onFormSubmit = () => {
    setIsSubmitting(true);
    onSubmit();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{
        flex: 1,
        backgroundColor: colors.mainThemeForegroundColor,
      }}>
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
            style={{
              color: styles.textNormalColor,
              fontSize: 34,
              marginBottom: 24,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            {t('Login with your account')}
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 24,
              color: styles.textSecondaryColor,
              textAlign: 'center',
            }}>
            {t('Enter your password.')}
          </Text>
          <View
            style={{
              marginTop: 16,
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
                    errorString: email.errorString,
                  });
                }}
                blurOnSubmit={true}
                onSubmitEditing={onFormSubmit}
                autoCapitalize={'none'}
              />
            </View>
            <View
              style={{
                marginTop: 40,
                width: '100%',
              }}>
              <FieldSetTextInput
                placeholder={'Password'}
                value={password.value}
                error={password.error}
                errorString={password.errorString}
                onChangeText={text =>
                  setPassword({
                    value: text,
                    error: false,
                    errorString: password.errorString,
                  })
                }
                secureTextEntry={true}
                blurOnSubmit={true}
                onSubmitEditing={onFormSubmit}
                autoFocus={true}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsSubmitting(true);
              onSubmit();
            }}
            style={[
              styles.bgPrimary,
              {
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 24,
                height: 48,
                marginTop: 24,
                width: '100%',
              },
            ]}>
            {isSubmitting && <ActivityIndicator color={'white'} />}
            {!isSubmitting && (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Login
              </Text>
            )}
          </TouchableOpacity>
          <Text
            onPress={() =>
              navigation.navigate('ForgotPasswordScreen', {email: email.value})
            }
            style={{
              marginTop: 16,
              color: styles.textSecondaryColor,
              textAlign: 'center',
              fontSize: 16,
            }}>
            {t('Forgot password?')}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

SignInScreen.propTypes = {
  navigation: PropTypes.object,
};

function exportScreen(props) {
  const {colors, dark} = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <SignInScreen {...props} colors={colors} dark={dark} insets={insets} />
  );
}

export default connect(({auth}) => ({auth}))(exportScreen);

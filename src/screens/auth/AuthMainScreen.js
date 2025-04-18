import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  Linking,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import API from '../../helpers/Axios';
import FieldSetTextInput from '../../components/FieldSetTextInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../store/configureStore';
import Toast from 'react-native-toast-message';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import css from '../../Styles';
import {useTranslation} from 'react-i18next';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Settings = require('../../config/Settings');

// This is the main screen for the authentication flow
// It takes in the navigation, route, and dispatch as props
const AuthMainScreen = ({navigation, route, dispatch}) => {
  const styles = css();
  const {t} = useTranslation();

  // State to keep track of whether the email input field is in focus or not
  const [emailFocus] = useState(
    (route.params && route.params.focus) !== undefined,
  );

  // State to keep track of whether the form is submitting or not
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to keep track of the email input field value and error
  const [email, setEmail] = useState({
    value: '',
    error: false,
    errorString: null,
  });

  // Function that gets called when the user submits the email verification code
  const onSubmit = code => {
    // If the form is already submitting, don't do anything
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const data = {
      email: email.value,
    };

    // Make a POST request to the API endpoint to validate the email
    API.post('auth/emailValidate', data)
      .then(res => {
        // If the email is valid, navigate to the next screen
        navigation.navigate('UserInfoScreen', {email: email.value});
        setIsSubmitting(false);
      })
      .catch(error => {
        console.log(error);
        setIsSubmitting(false);

        // If there's an error with the email, set the email state to reflect the error
        setEmail({
          value: email.value,
          error: error.response.data.errors.email !== undefined,
          errorString:
            error.response.data.errors.email !== undefined
              ? error.response.data.errors.email[0]
              : 'Error',
        });

        console.log(error.response.data.errors.email);

        // If the email is already taken, navigate to the sign-in screen instead
        if (
          error.response.data.errors.email !== undefined &&
          error.response.data.errors.email[0] ===
            t('The email has already been taken.')
        ) {
          navigation.navigate('SignInScreen', {email: email.value});

          // Set the email state to remove the error
          setEmail({
            value: email.value,
            error: false,
            errorString: email.errorString,
          });
        }
      });
  };

  // Function that gets called when the user submits the form
  const onFormSubmit = () => {
    setIsSubmitting(true);
    onSubmit();
  };

  const socialSites = [
    {
      title: 'Facebook',
      iconName: 'facebook-square',
      iconColor: '#2e89ff',
      action: () => {
        redirectToService('facebook').then(() => {});
      },
    },
    {
      title: 'Google',
      iconName: 'google',
      iconColor: '#DB4437',
      action: () => {
        redirectToService('google').then(() => {});
      },
    },
  ];

  const onTokenReturn = access_token => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Login success, please hold on..',
    });
    AsyncStorage.setItem('access_token', access_token);
    API.post('auth/user')
      .then(res => {
        dispatch({type: 'AUTH_CHANGE', user: res.data});
      })
      .catch(error => {
        console.log(error.response.data);
      });
    API.get('role').then(res => {
      store.dispatch({type: 'UPDATE_ROLE', role: res.data});
    });
  };

  const redirectToService = async service => {
    const url = `${Settings.API_URL.replace(
      '/api',
      '',
    )}/connect/redirect/${service}`;
    try {
      if (InAppBrowser.isAvailable()) {
        InAppBrowser.openAuth(url, '', {
          ephemeralWebSession: false,
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
          forceCloseOnRedirection: false,
        }).then(response => {
          console.log(response);
          if (response.type === 'success' && response.url) {
            if (response.url.includes('login/success')) {
              let token = response.url.replace(
                Settings.DEEP_LINK_SCHEME + '://engine/login/success/',
                '',
              );
              console.log(token);
              onTokenReturn(token);
            } else {
              AsyncStorage.setItem('access_token', '');
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: `Your ${service} has been associated with another account.`,
              });
            }
            Linking.openURL(response.url);
          }
        });
      } else {
        alert('Can not use in-app browser.');
      }
    } catch (error) {
      alert('Please use login by username and password.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={[styles.px4, styles.flexGrow1]}>
      <ScrollView
        style={[styles.px5]}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="handled">
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: styles.textNormalColor,
              fontSize: 32,
              marginBottom: 16,
              fontWeight: '600',
            }}>
            Let's go
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 24,
              color: styles.textNormalColor,
            }}>
            {t("We won't post anything on your profile")}
          </Text>
          <View
            style={{
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: -8,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {socialSites.map((item, index) => (
                <View
                  key={index}
                  style={{
                    width: 100 / socialSites.length + '%',
                    paddingHorizontal: 8,
                  }}>
                  <TouchableOpacity
                    onPress={item.action}
                    style={{
                      height: 48,
                      borderRadius: 24,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingHorizontal: 16,
                      backgroundColor: item.iconColor,
                    }}>
                    <AntDesign name={item.iconName} size={24} color={'white'} />
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '500',
                        marginLeft: 8,
                        color: 'white',
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: 1,
              marginTop: 40,
            }}
          />
          <Text
            style={{
              fontWeight: '500',
              fontSize: 16,
              marginBottom: 40,
              color: styles.textNormalColor,
            }}>
            {t('or continue with email')}
          </Text>
          <View
            style={{
              width: '100%',
            }}>
            <FieldSetTextInput
              placeholder={'Your email'}
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
              autoFocus={emailFocus}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
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
                {t('Continue')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AuthMainScreen.propTypes = {
  navigation: PropTypes.object,
};

export default connect(({auth}) => ({auth}))(AuthMainScreen);

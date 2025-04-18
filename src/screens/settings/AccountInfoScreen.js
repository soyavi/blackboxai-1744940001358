import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Switch,
  Appearance,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {SvgXml} from 'react-native-svg';
import ImagePicker from 'react-native-image-crop-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/dist/Feather';
import NavContainer from '../../components/NavContainer';
import API from '../../helpers/Axios';
import moment from 'moment';
import FieldSetTextInput from '../../components/FieldSetTextInput';
import css from '../../Styles';
import {useTranslation} from 'react-i18next';
import UserAvatar from '../../components/UserAvatar';
import {store} from '../../store/configureStore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AccountInfoScreen = ({navigation, auth, dispatch}) => {
  const styles = css();
  const {t, i18n} = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState({
    value: auth.user.name || '',
    error: false,
    errorString: null,
  });

  const [bio, setBio] = useState({
    value: auth.user.bio || '',
    error: false,
    errorString: null,
  });

  const onSubmit = () => {
    if ((!name.value && !bio.value) || isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    const data = new FormData();
    data.append('name', name.value);
    data.append('bio', bio.value);

    if (selectedImage) {
      data.append('artwork', {
        uri: selectedImage,
        type: 'image/jpeg',
        name: 'image',
      });
    }

    API.post('auth/user/settings/profile', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        dispatch({type: 'USER_INFO_CHANGE', user: res.data});
        setIsSubmitting(false);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  return (
    <SafeAreaView
      style={[styles.flexGrow1, styles.bgLight]}
      edges={['right', 'left']}>
      <NavContainer title={t('Account info')} navigation={navigation} />
      <ScrollView
        style={[styles.flexGrow1, styles.px4]}
        showsVerticalScrollIndicator={true}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 24,
          }}>
          <View>
            <UserAvatar
              name={auth.user.name}
              url={selectedImage || auth.user.artwork_url}
              width={108}
              radius={56}
            />
            <TouchableOpacity
              onPress={() => {
                ImagePicker.openPicker({
                  width: 500,
                  height: 500,
                  cropping: true,
                  cropperCircleOverlay: true,
                  mediaType: 'photo',
                }).then(image => {
                  console.log(image.sourceURL);
                  setSelectedImage(image.sourceURL);
                });
              }}
              style={[
                {
                  position: 'absolute',
                  zIndex: 10,
                  top: 8,
                  right: -8,
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: styles.bgMainColor,
                },
                styles.shadow,
              ]}>
              <Icon name={'edit'} size={16} color={styles.textNormalColor} />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={[
            styles.textSecondary,
            styles.small,
            styles.textUpperCase,
            styles.ms3,
            styles.mb2,
          ]}>
          {t('Edit Profile')}
        </Text>
        <View style={[styles.card, styles.mb5]}>
          <View style={[styles.cardBody]}>
            <View
              style={{
                marginTop: 16,
              }}>
              <View
                style={{
                  marginBottom: 24,
                }}>
                <FieldSetTextInput
                  placeholder={'Display Name'}
                  value={name.value}
                  error={name.error}
                  errorString={name.errorString}
                  onChangeText={text => {
                    setName({
                      value: text,
                      error: false,
                      errorString: name.errorString,
                    });
                  }}
                  blurOnSubmit={true}
                  autoCapitalize={'none'}
                />
              </View>
              <View
                style={{
                  marginBottom: 8,
                }}>
                <FieldSetTextInput
                  placeholder={'Bio'}
                  value={bio.value}
                  error={bio.error}
                  errorString={bio.errorString}
                  onChangeText={text => {
                    setBio({
                      value: text,
                      error: false,
                      errorString: bio.errorString,
                    });
                  }}
                  blurOnSubmit={true}
                  autoCapitalize={'none'}
                />
              </View>
              <TouchableOpacity
                onPress={() => onSubmit()}
                style={[
                  styles.btn,
                  styles.btnPrimary,
                  styles.btnCircleRounded,
                  styles.mb5,
                  styles.mt3,
                ]}>
                {isSubmitting && <ActivityIndicator color={'white'} />}
                {!isSubmitting && (
                  <Text style={[styles.textWhite, styles.fwBold]}>
                    {t('Save')}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.card, styles.mt2]}>
          <View
            style={[
              styles.cardBody,
              styles.dFlex,
              styles.alignItemsCenter,
              styles.py1,
              styles.gap4,
            ]}>
            <Ionicons
              name={'at-outline'}
              size={24}
              color={styles.textNormalColor}
            />
            <Text style={[styles.textNormal]}>{auth.user.email}</Text>
          </View>
          <View style={[styles.cardHr]} />
          <TouchableOpacity
            onPress={() => {
              dispatch({type: 'AUTH_CHANGE', user: {}});
              dispatch({type: 'ACCESS_TOKEN_CHANGE', accessToken: null});
            }}
            style={[
              styles.cardBody,
              styles.dFlex,
              styles.alignItemsCenter,
              styles.py1,
              styles.gap4,
            ]}>
            <Ionicons
              name={'log-out-outline'}
              size={24}
              color={styles.textNormalColor}
            />
            <Text style={[styles.textNormal]}>{t('Log out')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

AccountInfoScreen.propTypes = {
  navigation: PropTypes.object,
};

export default connect(({auth}) => ({auth}))(AccountInfoScreen);

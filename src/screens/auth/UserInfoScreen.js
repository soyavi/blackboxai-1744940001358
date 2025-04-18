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
import FieldSetTextInput from '../../components/FieldSetTextInput';
import AuthNav from './AuthNav';
import {useTranslation} from 'react-i18next';
import css from '../../Styles';

const UserInfoScreen = ({navigation, route, dispatch}) => {
  const {t} = useTranslation();
  const styles = css();

  const [name, setName] = useState({
    value: '',
    error: false,
    errorString: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = () => {
    if (name.value.length < 3) {
      setName({
        value: name.value,
        error: true,
        errorString: t('Name is required, with at least 3 letters.'),
      });
      return;
    }
    navigation.navigate('PasswordScreen', {
      name: name.value,
      email: route.params?.email,
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
            {t("What's your name")}
          </Text>
          <Text
            style={[
              styles.textNormal,
              styles.textSecondary,
              styles.textCenter,
              styles.mb5,
            ]}>
            {t("Let's get to know you...")}
          </Text>
          <View
            style={{
              marginTop: 12,
            }}>
            <View>
              <FieldSetTextInput
                placeholder={t('Your full name')}
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
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
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

UserInfoScreen.propTypes = {
  navigation: PropTypes.object,
};

export default connect(({auth}) => ({auth}))(UserInfoScreen);

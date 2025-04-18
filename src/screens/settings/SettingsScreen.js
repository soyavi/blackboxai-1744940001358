import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalNavContainer from '../../components/ModalNavContainer';
import {useTranslation} from 'react-i18next';
import css from '../../Styles';
import UserAvatar from '../../components/UserAvatar';

const SettingsScreen = ({auth}) => {
  const styles = css();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const renderMenu = (title, icon, action) => {
    return (
      <TouchableOpacity
        onPress={action}
        style={[
          styles.cardBody,
          styles.dFlex,
          styles.alignItemsCenter,
          styles.justifyContentBetween,
          styles.py1,
        ]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Ionicons name={icon} size={24} color={styles.textNormalColor} />
          <View
            style={{
              marginLeft: 16,
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={[styles.textNormal]}>{title}</Text>
            <Ionicons name={'chevron-forward'} size={16} color={'#6D6E6F'} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.flexGrow1, styles.bgLight]}
      edges={['right', 'left']}>
      <ModalNavContainer title={t('Settings')} navigation={navigation} />
      <ScrollView
        style={{
          flex: 1,
          padding: 16,
        }}
        showsVerticalScrollIndicator={false}>
        {auth.isLogged && (
          <View style={[styles.card, styles.mb5]}>
            <View style={[styles.dFlex, styles.alignItemsCenter]}>
              <UserAvatar
                name={auth.user.name}
                url={auth.user.artwork_url}
                width={60}
                radius={30}
              />
              <View
                style={{
                  flex: 1,
                  marginLeft: 16,
                }}>
                <Text style={[styles.textNormal, styles.fwBold, styles.mb1]}>
                  {auth.user.name}
                </Text>
                <Text style={[styles.textSecondary]}>{auth.user.email}</Text>
              </View>
            </View>
          </View>
        )}
        {auth.isLogged && (
          <View style={[styles.card, styles.mb5]}>
            {renderMenu(t('Account management'), 'person-outline', () =>
              navigation.navigate('AccountInfoScreen'),
            )}
          </View>
        )}
        <Text
          style={[
            styles.textSecondary,
            styles.small,
            styles.textUpperCase,
            styles.ms3,
          ]}>
          {t('Preferences')}
        </Text>
        <View style={[styles.card, styles.mt2]}>
          {renderMenu(t('Languages'), 'language-outline', () =>
            navigation.navigate('LanguagesScreen'),
          )}
          <View style={[styles.cardHr]} />
          {renderMenu(t('Appearance'), 'color-palette-outline', () =>
            navigation.navigate('AppearanceScreen'),
          )}
          <View style={[styles.cardHr]} />
          {renderMenu(t('Legal and Privacy'), 'lock-closed-outline', () =>
            navigation.navigate('LegalScreen'),
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(({auth}) => ({auth}))(SettingsScreen);

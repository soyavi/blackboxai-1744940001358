import React, {useEffect, useState} from 'react';
import {
  Appearance,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavContainer from '../../components/NavContainer';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import css from '../../Styles';
import locales from '../../locales';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguagesScreen = ({navigation, dark, display}) => {
  const styles = css();
  const {t, i18n} = useTranslation();
  const [currentLangCode, setCurrentLangCode] = useState(i18n.language);

  useEffect(() => {
    const updateCurrentLangCode = () => {
      setCurrentLangCode(i18n.language);
    };
    i18n.on('languageChanged', updateCurrentLangCode);
    return () => {
      i18n.off('languageChanged', updateCurrentLangCode);
    };
  }, []);

  return (
    <SafeAreaView
      edges={['right', 'left']}
      style={[styles.flexGrow1, styles.bgLight]}>
      <NavContainer title={'Language'} />
      <ScrollView style={[styles.flexGrow1, styles.px4]}>
        <Text
          style={[
            styles.textSecondary,
            styles.small,
            styles.textUpperCase,
            styles.ms3,
          ]}>
          {t('Interface Language')}
        </Text>
        <View style={[styles.card, styles.mt2]}>
          {Object.keys(locales).map((langCode, index) => {
            const lang = locales[langCode];
            return (
              <TouchableOpacity
                onPress={async () => {
                  i18n.changeLanguage(langCode);
                  await AsyncStorage.setItem('selectedLanguage', langCode); // store the selected language in AsyncStorage
                }}
                key={langCode}>
                <View
                  style={[
                    styles.cardBody,
                    styles.dFlex,
                    styles.alignItemsCenter,
                    styles.justifyContentBetween,
                    styles.my1,
                  ]}>
                  <Text style={[styles.textNormal]}>{lang.name}</Text>
                  {currentLangCode === langCode && (
                    <Ionicons
                      name="ios-checkmark-outline"
                      color={styles.textPrimaryColor}
                      size={16}
                    />
                  )}
                </View>
                {index !== Object.keys(locales).length - 1 && (
                  <View style={[styles.cardHr]} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(({auth, display}) => ({auth, display}))(LanguagesScreen);

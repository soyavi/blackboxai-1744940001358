import React, {useState} from 'react';
import {Text, View, Switch, Appearance, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavContainer from '../../components/NavContainer';
import {ThemeContext} from '../../components/ThemeContext';
import {store} from '../../store/configureStore';
import {connect} from 'react-redux';
import css from '../../Styles';
import {useTranslation} from 'react-i18next';

function AppearanceScreen({navigation, display}) {
  const styles = css();
  const {t} = useTranslation();
  const {setTheme, theme} = React.useContext(ThemeContext);
  const [isEnabled, setIsEnabled] = useState(display.darkMode);
  const [isSystemEnabled, setSystemIsEnabled] = useState(
    display.systemPreference,
  );

  return (
    <SafeAreaView
      edges={['right', 'left']}
      r
      style={[styles.bgLight, styles.flexGrow1]}>
      <NavContainer title={'Appearance'} />
      <ScrollView style={[styles.flexGrow1, styles.px4]}>
        <Text
          style={[
            styles.textSecondary,
            styles.small,
            styles.textUpperCase,
            styles.ms3,
          ]}>
          {t('Dark mode options')}
        </Text>
        <View style={[styles.card, styles.mt2]}>
          <View
            style={[
              styles.cardBody,
              styles.dFlex,
              styles.alignItemsCenter,
              styles.justifyContentBetween,
            ]}>
            <Text style={[styles.textNormal]}>{t('Toggle dark mode')}</Text>
            <Switch
              trackColor={{
                false: styles.bgLightColor,
                true: styles.bgSuccessColor,
              }}
              thumbColor={'white'}
              onValueChange={() => {
                setIsEnabled(previousState => !previousState);
                setTheme(theme === 'Light' ? 'Dark' : 'Light');
                store.dispatch({type: 'TOGGLE_DARK_MODE'});
              }}
              value={isEnabled}
              disabled={isSystemEnabled}
              style={{
                opacity: isSystemEnabled ? 0.5 : 1,
              }}
            />
          </View>
          <View style={[styles.cardHr]} />
          <View
            style={[
              styles.cardBody,
              styles.dFlex,
              styles.alignItemsCenter,
              styles.justifyContentBetween,
            ]}>
            <Text style={[styles.textNormal]}>
              {t('Follow system preference')}
            </Text>
            <Switch
              trackColor={{false: '#767577', true: 'green'}}
              thumbColor={isSystemEnabled ? 'white' : 'white'}
              onValueChange={() => {
                setSystemIsEnabled(previousState => !previousState);
                setTheme(Appearance.getColorScheme());
                store.dispatch({type: 'TOGGLE_SYSTEM_PREFERENCE'});
              }}
              value={isSystemEnabled}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default connect(({auth, display}) => ({auth, display}))(
  AppearanceScreen,
);

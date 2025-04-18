import React, {useEffect, useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import {store, persistor} from './src/store/configureStore';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import {
  ActivityIndicator,
  Appearance,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import {ThemeContext} from './src/components/ThemeContext';
import {
  DrawerActions,
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import AuthMainScreen from './src/screens/auth/AuthMainScreen';
import SignInScreen from './src/screens/auth/SignInScreen';
import PasswordScreen from './src/screens/auth/PasswordScreen';
import UserInfoScreen from './src/screens/auth/UserInfoScreen';
import ForgotPasswordScreen from './src/screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from './src/screens/auth/ResetPasswordScreen';
import SetNewPasswordScreen from './src/screens/auth/SetNewPasswordScreen';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {I18nextProvider, useTranslation} from 'react-i18next';
import i18n from './src/helpers/i18n';
import UserAvatar from './src/components/UserAvatar';
import API from './src/helpers/Axios';
import SettingsScreen from './src/screens/settings/SettingsScreen';
import AccountInfoScreen from './src/screens/settings/AccountInfoScreen';
import AppearanceScreen from './src/screens/settings/AppearanceScreen';
import LegalScreen from './src/screens/settings/LegalScreen';
import LanguagesScreen from './src/screens/settings/LanguagesScreen';
import ChatScreen from './src/screens/ChatScreen';
import AgendaScreen from './src/screens/agenda/AgendaScreen';
import css from './src/Styles';
import Feather from 'react-native-vector-icons/Feather';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import PageScreen from './src/screens/settings/PageScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Auth = createStackNavigator();
const Settings = createStackNavigator();

// This function is a custom drawer content component in React Native
function CustomDrawerContent({}) {
  // Importing the css function from a stylesheet
  const styles = css();

  // Hook that returns the safe area insets of the device
  const insets = useSafeAreaInsets();

  // Hook that returns the translation function from the i18n library
  const {t} = useTranslation();

  // Accessing the auth state from the Redux store
  const auth = useSelector(state => state.auth);

  // Accessing the conversation state from the Redux store
  const conversation = useSelector(state => state.conversation);

  // Hook for accessing the navigation object
  const navigation = useNavigation();

  // State for the current conversation ID
  const [currentConversationId, setCurrentConversationId] = useState(null);

  // Update the current conversation ID state whenever the currentConversationId value changes in the conversation state
  useEffect(() => {
    setCurrentConversationId(conversation.currentConversationId);
  }, [conversation.currentConversationId]);

  // State for storing the sessions data
  const [sessions, setSessions] = useState([]);

  // Function for fetching the sessions data using the API endpoint
  const getSessions = () => {
    API.post('auth/chat/sessions', {})
      .then(res => {
        setSessions(res.data.data);
        // Dispatch an action to update the current conversation ID in the Redux store with the ID of the first session
        store.dispatch({
          type: 'CURRENT_CONVERSATION_ID_CHANGE',
          conversationId: parseInt(res.data.data[0].id),
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Fetch the sessions data when the component mounts or when the chat_sessions value changes in the conversation state
  useEffect(() => {
    getSessions();
  }, [conversation.chat_sessions]);

  return (
    <View
      style={[
        styles.bgMain,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          flex: 1,
          paddingHorizontal: 8,
          justifyContent: 'space-between',
        },
      ]}>
      <View style={[styles.flexGrow1]}>
        <View
          style={[
            styles.dFlex,
            styles.alignItemsCenter,
            styles.justifyContentBetween,
            styles.mb4,
            styles.mt4,
          ]}>
          <View style={[styles.dFlex, styles.alignItemsCenter, styles.gap3]}>
            <UserAvatar
              name={auth.user.name}
              url={auth.user.artwork_url}
              width={40}
              radius={20}
            />
            <Text style={[styles.textNormal, styles.fwBold]}>
              {auth.user.name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingsStack')}>
            <Feather
              name={'settings'}
              size={24}
              color={styles.textSecondaryColor}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.flexGrow1]}>
          {sessions.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                store.dispatch({
                  type: 'CURRENT_CONVERSATION_ID_CHANGE',
                  conversationId: parseInt(item.id),
                });
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
              style={[
                styles.btn,
                styles.px0,
                styles.gap2,
                styles.px2,
                conversation.currentConversationId &&
                conversation.currentConversationId === item.id
                  ? styles.btnLight
                  : null,
              ]}>
              <Feather
                name={'message-square'}
                size={24}
                color={styles.textNormalColor}
              />
              <Text
                numberOfLines={1}
                style={[styles.flexGrow1, styles.textNormal]}>
                {(item.conversation &&
                  item.conversation.last_message &&
                  item.conversation.last_message.body) ||
                  t('New Chat')}
              </Text>
            </TouchableOpacity>
          ))}
          
          <View style={[styles.mt4, styles.borderTopLight, styles.pt4]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Agenda');
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
              style={[
                styles.btn,
                styles.px0,
                styles.gap2,
                styles.px2,
                styles.btnLight,
              ]}>
              <Feather
                name={'calendar'}
                size={24}
                color={styles.textNormalColor}
              />
              <Text style={[styles.flexGrow1, styles.textNormal]}>
                {t('Agenda')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const SettingsStack = () => {
  const styles = css();
  const display = useSelector(state => state.display);
  const [themeChange, setThemeChange] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setThemeChange(!themeChange);
    }
  }, [display.darkMode]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('Modal shown');
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(styles.bgLightColor);
      Platform.OS === 'android' &&
        SystemNavigationBar.setNavigationColor(styles.bgLightColor);
      return () => {
        Platform.OS === 'android' &&
          StatusBar.setBackgroundColor(styles.bgMainColor);
        Platform.OS === 'android' &&
          SystemNavigationBar.setNavigationColor(styles.bgMainColor);
      };
    }, [themeChange]),
  );

  return (
    <Settings.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Settings.Screen name="SettingsScreen" component={SettingsScreen} />
      <Settings.Screen name="AccountInfoScreen" component={AccountInfoScreen} />
      <Settings.Screen name="AppearanceScreen" component={AppearanceScreen} />
      <Settings.Screen name="LegalScreen" component={LegalScreen} />
      <Settings.Screen name="LanguagesScreen" component={LanguagesScreen} />
      <Settings.Screen name="PageScreen" component={PageScreen} />
    </Settings.Navigator>
  );
};

function MainDrawer({navigation}) {
  const styles = css();
  const {t} = useTranslation();
  const dimensions = useWindowDimensions();

  const [isCreatingNewChat, setIsCreatingNewChat] = useState(false);

  const createNewChatSession = () => {
    setIsCreatingNewChat(true);
    API.post('auth/chat/new')
      .then(res => {
        setIsCreatingNewChat(false);
        store.dispatch({
          type: 'CURRENT_CONVERSATION_ID_CHANGE',
          conversationId: parseInt(res.data.conversation.id),
        });
        store.dispatch({
          type: 'CHAT_SESSIONS_CHANGE',
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Drawer.Navigator
      initialRouteName="ChatScreen"
      screenOptions={{
        drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
        drawerStyle: {
          borderRightColor: styles.borderLightColor,
          borderRightWidth: 1,
          width: 280,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Chat Genius"
        component={ChatScreen}
        options={{
          headerTitle: t('Chats'),
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: styles.textNormalColor,
          },
          headerLeft: () => (
            <View style={[styles.ms4]}>
              {dimensions.width < 768 && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}>
                  <Feather
                    name={'menu'}
                    size={24}
                    color={styles.textPrimaryColor}
                  />
                </TouchableOpacity>
              )}
            </View>
          ),
          headerRight: () => (
            <View
              style={[
                styles.dFlex,
                styles.alignItemsCenter,
                styles.justifyContentBetween,
                styles.gap3,
                styles.me4,
              ]}>
              <TouchableOpacity
                onPress={() => {
                  createNewChatSession();
                }}>
                {isCreatingNewChat && (
                  <ActivityIndicator
                    color={styles.textPrimaryColor}
                    size={24}
                  />
                )}
                {!isCreatingNewChat && (
                  <>
                    <Feather
                      name={'edit'}
                      size={24}
                      color={styles.textPrimaryColor}
                    />
                  </>
                )}
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Agenda"
        component={AgendaScreen}
        options={{
          headerTitle: t('Agenda'),
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
            color: styles.textNormalColor,
          },
          headerLeft: () => (
            <View style={[styles.ms4]}>
              {dimensions.width < 768 && (
                <TouchableOpacity
                  onPress={() => {
                    navigation.dispatch(DrawerActions.toggleDrawer());
                  }}>
                  <Feather
                    name={'menu'}
                    size={24}
                    color={styles.textPrimaryColor}
                  />
                </TouchableOpacity>
              )}
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const AuthStack = () => {
  return (
    <Auth.Navigator
      initialRouteName="AuthMainScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Auth.Screen name="AuthMainScreen" component={AuthMainScreen} />
      <Auth.Screen name="SignInScreen" component={SignInScreen} />
      <Auth.Screen name="PasswordScreen" component={PasswordScreen} />
      <Auth.Screen name="UserInfoScreen" component={UserInfoScreen} />
      <Auth.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Auth.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      <Auth.Screen
        name="SetNewPasswordScreen"
        component={SetNewPasswordScreen}
      />
    </Auth.Navigator>
  );
};

function AppNavigator() {
  const styles = css();
  const auth = useSelector(state => state.auth);
  const display = useSelector(state => state.display);
  const [isLogged, setIsLogged] = useState(auth.isLogged);

  useEffect(() => {
    setIsLogged(auth.isLogged);
  }, [auth.isLogged]);

  useEffect(() => {
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(styles.bgMainColor);
    Platform.OS === 'android' &&
      SystemNavigationBar.setNavigationColor(styles.bgMainColor);
  }, [display.darkMode]);

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: styles.bgMainColor,
        },
      }}>
      <StatusBar
        barStyle={display.darkMode ? 'light-content' : 'dark-content'}
      />
      <Stack.Navigator>
        {isLogged && (
          <>
            <Stack.Screen
              name="MainDrawer"
              component={MainDrawer}
              options={({route}) => ({headerShown: false})}
            />
            <Stack.Group screenOptions={{presentation: 'modal'}}>
              <Stack.Screen
                name="SettingsStack"
                component={SettingsStack}
                options={({route}) => ({headerShown: false})}
              />
            </Stack.Group>
          </>
        )}
        {!isLogged && (
          <Stack.Screen
            options={({route}) => ({headerShown: false})}
            name="AuthStack"
            component={AuthStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  const display = store.getState().display;
  const [theme, setTheme] = useState(
    display.systemPreference
      ? Appearance.getColorScheme()
      : display.darkMode
      ? 'Dark'
      : 'Light',
  );
  const themeData = {theme, setTheme};

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <ThemeContext.Provider value={themeData}>
          <SafeAreaProvider
            style={[
              {
                backgroundColor: display.darkMode ? '#0d172a' : 'white',
              },
            ]}>
            <I18nextProvider i18n={i18n}>
              <ActionSheetProvider>
                <AppNavigator />
              </ActionSheetProvider>
            </I18nextProvider>
          </SafeAreaProvider>
        </ThemeContext.Provider>
      </PersistGate>
    </Provider>
  );
}

export default App;

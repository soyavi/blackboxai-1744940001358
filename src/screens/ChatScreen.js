import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
  Animated,
  TouchableOpacity,
  useWindowDimensions,
  Share,
} from 'react-native';
import API from '../helpers/Axios';
import UserAvatar from '../components/UserAvatar';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import css from '../Styles';
import {hex2RgbA} from '../helpers/Utils';
import {store} from '../store/configureStore';
import ChatTypingAnimation from '../components/ChatTypingAnimation';
import {useActionSheet} from '@expo/react-native-action-sheet';
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
import RenderHtml from 'react-native-render-html';
import Clipboard from '@react-native-clipboard/clipboard';

// The ChatScreen component takes in two props, auth and conversation
const ChatScreen = ({auth, conversation}) => {
  // The styles variable is assigned the CSS classes defined in the ../Styles.js file
  const styles = css();
  // The insets variable is assigned the insets of the SafeAreaView that is currently visible
  const insets = useSafeAreaInsets();
  // The flatListRef variable is assigned a reference to the FlatList component
  const flatListRef = useRef(null);
  // The showActionSheetWithOptions variable is used to display an ActionSheet component
  const {showActionSheetWithOptions} = useActionSheet();
  // The t variable is assigned the current translation function, and the i18n variable is assigned the current translation object
  const {t} = useTranslation();
  // The isLoading variable is used to track whether the chat history is being loaded
  const [isLoading, setIsLoading] = useState(true);
  // The messages variable is used to store the messages in the chat history
  const [messages, setMessages] = useState([]);
  // The getChatHistory function retrieves the chat history for the conversation with the given conversationId
  const getChatHistory = conversationId => {
    setIsLoading(true);
    API.post('auth/chat/messages', {
      conversationId: conversationId,
    })
      .then(res => {
        setMessages(res.data.data);
        setIsLoading(false);
      })
      .catch(error => {});
  };
  // The useEffect hook calls the getChatHistory function when the conversation ID changes
  useEffect(() => {
    if (conversation.currentConversationId) {
      getChatHistory(conversation.currentConversationId);
    }
  }, [conversation.currentConversationId]);
  // The isSendingMessage variable is used to track whether a message is being sent
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  // The sendMessage function sends a message to the current conversation
  const sendMessage = () => {
    setIsSendingMessage(true);
    const message = {
      is_sender: 1,
      body: text.trim(),
    };
    // The message is added to the messages array
    setMessages(prev => [message, ...prev]);
    // The FlatList is scrolled to the top
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
    API.post('auth/chat/send-message', {
      assistant:
        messages.length > 0
          ? messages[messages.length - 1].is_sender
            ? ''
            : messages[messages.length - 1].body
          : '',
      conversationId: conversation.currentConversationId,
      text: text,
    })
      .then(res => {
        const response = {
          is_sender: 0,
          body: res.data.text,
        };
        setMessages(prev => [response, ...prev]);
        flatListRef.current.scrollToOffset({animated: true, offset: 0});
        setIsSendingMessage(false);
        if (res.data && res.data.usage) {
          store.dispatch({
            type: 'UPDATE_TOKENS',
            tokens: store.getState().common.tokens - res.data.usage,
          });
        }
      })
      .catch(error => {
        console.log(error);
        setIsSendingMessage(false);
      });
    setText('');
  };

  const [text, setText] = useState('');
  const handleChange = event => {
    setText(event.target.value);
  };

  const parseMd = md => {
    md = md.replace(/^\s*\n\*/gm, '<ul>\n*');
    md = md.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
    md = md.replace(/^\*(.+)/gm, '<li>$1</li>');

    md = md.replace(/^\s*\n\d\./gm, '<ol>\n1.');
    md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2');
    md = md.replace(/^\d\.(.+)/gm, '<li>$1</li>');

    md = md.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>');

    md = md.replace(/[\#]{6}(.+)/g, '<h6>$1</h6>');
    md = md.replace(/[\#]{5}(.+)/g, '<h5>$1</h5>');
    md = md.replace(/[\#]{4}(.+)/g, '<h4>$1</h4>');
    md = md.replace(/[\#]{3}(.+)/g, '<h3>$1</h3>');
    md = md.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>');
    md = md.replace(/[\#]{1}(.+)/g, '<h1>$1</h1>');

    md = md.replace(/^(.+)\n\=+/gm, '<h1>$1</h1>');
    md = md.replace(/^(.+)\n\-+/gm, '<h2>$1</h2>');

    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');

    md = md.replace(
      /[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g,
      '<a href="$2" title="$4">$1</a>',
    );

    md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');
    md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');
    md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');

    md = md.replace(
      /^\s*\n\`\`\`(([^\s]+))?/gm,
      '<pre style="color: #ffcb6b;background-color: #1b1b5e;padding-left: 16px;padding-right:8px;border-radius: 6px;">',
    );
    md = md.replace(/^\`\`\`\s*\n?/gm, '</pre>\n\n');

    md = md.replace(
      /[\`]{1}([^\`]+)[\`]{1}/g,
      '<code style="color: #ffcb6b;background-color: #1b1b5e;">$1</code>',
    );

    md = md.replace(/^\s*(\n)?(.+)/gm, function (m) {
      return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m)
        ? m
        : '<span>' + m + '</span>';
    });

    //strip p from pre
    md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, '$1$2');

    return (
      '<div style="color: ' + styles.textNormalColor + '">' + md + '<div/>'
    );
  };

  const renderMarkdown = text => {
    // Regular expression to match code blocks
    const regex = /(```)([\s\S]*?)\1/gm;

    // Split the text into parts using the regex
    const parts = text.split(regex);
    console.log('-->', parts);
    // Map the parts and create React Native components as necessary
    const elements = parts.map((part, index) => {
      if (part.match(regex)) {
        // Code block found, create a view with a code component
        const code = part.replace(/```/g, '');
        return (
          <View key={index} style={{backgroundColor: 'red', padding: 10}}>
            <Text style={{fontFamily: 'monospace'}}>{code}</Text>
          </View>
        );
      } else {
        // Normal text, create a Text component
        return <Text key={index}>{part}</Text>;
      }
    });

    // Return the array of React Native components
    return elements;
  };
  const {width} = useWindowDimensions();

  return (
    <SafeAreaView
      edges={['right', 'left', 'bottom']}
      style={[styles.flexGrow1, styles.bgMain]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={
          insets.bottom + (Platform.OS === 'ios' ? 64 : 72)
        }
        style={{
          flex: 1,
        }}>
        {isLoading && (
          <ActivityIndicator
            style={[
              styles.flexGrow1,
              styles.alignItemsCenter,
              styles.justifyContentCenter,
            ]}
            color={styles.textNormalColor}
          />
        )}
        {!isLoading && (
          <FlatList
            ref={flatListRef}
            inverted
            style={{
              flex: 1,
              transform: [{scaleY: -1}],
            }}
            contentContainerStyle={{}}
            ListHeaderComponent={
              <>
                {!messages.length && !isSendingMessage && (
                  <View style={[styles.flexGrow1, styles.justifyContentEnd]}>
                    <View style={[styles.px4, styles.flexColumn, styles.gap3]}>
                      {[
                        {
                          text: t('Explain quantum computing in simple terms'),
                        },
                        {
                          text: t(
                            'Got any creative ideas for a 10 year old’s birthday?',
                          ),
                        },
                        {
                          text: t(
                            'How do I make an HTTP request in Javascript?',
                          ),
                        },
                      ].map((item, key) => (
                        <TouchableOpacity
                          key={key}
                          onPress={() => setText(item.text)}
                          style={[
                            styles.btn,
                            styles.btnLight,
                            styles.btnCircleRounded,
                            styles.alignSelfStart,
                          ]}>
                          <Text numberOfLines={2} style={[styles.textNormal]}>
                            {item.text}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
                {isSendingMessage && (
                  <View
                    style={[
                      styles.dFlex,
                      styles.justifyContentBetween,
                      styles.borderBottom,
                      styles.borderLight,
                      styles.px4,
                      styles.py5,
                      styles.bgLight,
                    ]}>
                    <View
                      style={{
                        borderRadius: 18,
                        width: 36,
                        height: 36,
                        backgroundColor: '#0d6efd',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Ionicons
                        name="logo-electron"
                        color={'white'}
                        size={24}
                      />
                    </View>
                    <View style={[styles.ms3, styles.flexGrow1]}>
                      <ChatTypingAnimation
                        count={3}
                        color={styles.textSecondaryColor}
                        animationDuration={1000}
                        size={5}
                      />
                    </View>
                  </View>
                )}
              </>
            }
            ListFooterComponent={<View />}
            onContentSizeChange={() => {
              //this.scrollView.scrollToEnd({animated: true});
            }}
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            listKey={(item, index) => index.toString()}
            renderItem={(data, rowMap) => {
              let message = data.item;
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  style={[
                    styles.dFlex,
                    styles.justifyContentBetween,
                    styles.borderBottom,
                    styles.borderLight,
                    styles.px4,
                    styles.py5,
                    message.is_sender ? styles.bgMain : styles.bgLight,
                  ]}
                  onLongPress={() => {
                    const options = ['Copy', 'Share', 'Cancel'];
                    const destructiveButtonIndex = 5;
                    const cancelButtonIndex = 2;

                    showActionSheetWithOptions(
                      {
                        options,
                        cancelButtonIndex,
                        destructiveButtonIndex,
                      },
                      selectedIndex => {
                        switch (selectedIndex) {
                          case 0:
                            Clipboard.setString(message.body);
                            break;
                          case 1:
                            (async () => {
                              try {
                                const result = await Share.share({
                                  message: message.body,
                                });
                                if (result.action === Share.sharedAction) {
                                  if (result.activityType) {
                                    // shared with activity type of result.activityType
                                  } else {
                                    // shared
                                  }
                                } else if (
                                  result.action === Share.dismissedAction
                                ) {
                                  // dismissed
                                }
                              } catch (error) {}
                            })();
                            break;
                          case destructiveButtonIndex:
                            break;
                          case cancelButtonIndex:
                        }
                      },
                    );
                  }}>
                  {!!message.is_sender && (
                    <UserAvatar
                      name={auth.user.name}
                      url={auth.user.artwork_url}
                      width={36}
                      radius={18}
                    />
                  )}
                  {!message.is_sender && (
                    <View
                      style={{
                        borderRadius: 18,
                        width: 36,
                        height: 36,
                        backgroundColor: '#0d6efd',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Ionicons
                        name="logo-electron"
                        color={'white'}
                        size={24}
                      />
                    </View>
                  )}
                  <View style={[styles.ms3, styles.flexGrow1]}>
                    {message.body && (
                      <RenderHtml
                        contentWidth={width}
                        source={{
                          html: parseMd(message.body),
                        }}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
        <View
          style={[
            styles.px4,
            styles.pt2,
            styles.dFlex,
            styles.justifyContentBetween,
            styles.alignItemsEnd,
            styles.gap3,
            Platform.OS === 'android' && styles.mb2,
          ]}>
          <AnimatedTextInput
            value={text}
            onChangeText={e => setText(e)}
            multiline={true}
            maxHeight={108}
            placeholder={t('Ask anything...')}
            placeholderTextColor={hex2RgbA(styles.textSecondaryColor, 0.5)}
            style={[
              styles.border,
              styles.borderLight,
              styles.px4,
              styles.flexGrow1,
              styles.textNormal,
              {
                paddingTop: Platform.OS === 'ios' ? 11 : 7,
                paddingBottom: Platform.OS === 'ios' ? 11 : 7,
                borderRadius: 24,
                textAlign: 'left',
              },
            ]}
          />
          <TouchableOpacity
            style={{
              marginBottom: 10,
            }}
            onPress={() => {
              if (text.length && !isSendingMessage) {
                sendMessage();
              }
            }}>
            <Ionicons name={'send'} size={24} color={'#0084ff'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default connect(({auth, conversation}) => ({auth, conversation}))(
  ChatScreen,
);

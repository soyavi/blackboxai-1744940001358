import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import css from '../../Styles';

const AuthNav = ({title = null}) => {
  const navigation = useNavigation();
  const styles = css();

  return (
    <SafeAreaView
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
      edges={['right', 'left', 'top']}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 48,
          paddingHorizontal: 16,
        }}>
        <TouchableOpacity
          style={{
            width: 24,
            height: 24,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: 16,
            zIndex: 1,
          }}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name={'arrow-back'}
            size={24}
            color={styles.textNormalColor}
          />
        </TouchableOpacity>
        {title && (
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: 'white',
              textAlign: 'center',
              flex: 1,
            }}>
            {title}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default connect(({auth}) => ({auth}))(AuthNav);

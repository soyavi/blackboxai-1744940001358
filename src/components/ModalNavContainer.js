import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/Feather';
import {useNavigation} from '@react-navigation/native';
import css from '../Styles';

const NavContainer = ({title = null}) => {
  const navigation = useNavigation();
  const styles = css();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        paddingLeft: 24,
        paddingRight: 24,
      }}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 16,
          zIndex: 1,
        }}
        onPress={() => navigation.goBack()}>
        <Icon name={'x'} size={24} color={styles.textNormalColor} />
      </TouchableOpacity>
      {title && (
        <Text
          style={[
            styles.textNormal,
            styles.fwBold,
            styles.textCenter,
            styles.flexGrow1,
          ]}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default connect(({auth}) => ({auth}))(NavContainer);

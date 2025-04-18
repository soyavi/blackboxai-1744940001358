import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/dist/Feather';
import {useNavigation, useTheme} from '@react-navigation/native';
import css from '../Styles';

const NavContainer = ({title = null}) => {
  const styles = css();
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.px4,
        styles.gap4,
        {
          flexDirection: 'row',
          alignItems: 'center',
          height: 48,
        },
      ]}>
      <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
        <Icon name={'chevron-left'} size={24} color={styles.textNormalColor} />
      </TouchableOpacity>
      {title && (
        <Text style={[styles.flexGrow1, styles.fwBold, styles.textNormal]}>
          {title}
        </Text>
      )}
    </View>
  );
};

export default connect(({auth}) => ({auth}))(NavContainer);

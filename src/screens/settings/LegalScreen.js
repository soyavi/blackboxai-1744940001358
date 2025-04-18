import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavContainer from '../../components/NavContainer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import css from '../../Styles';
import API from '../../helpers/Axios';

function LegalScreen(props) {
  const styles = css();
  const [isLoading, setIsLoading] = useState(true);

  const [pages, setPages] = useState([]);

  const getPages = () => {
    API.post('pages')
      .then(res => {
        setPages(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPages();
  }, []);

  return (
    <SafeAreaView
      edges={['right', 'left']}
      style={[styles.flexGrow1, styles.bgLight]}>
      <NavContainer title={'Legal'} navigation={props.navigation} />
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
        <>
          <ScrollView style={[styles.flexGrow1, styles.px4]}>
            <View style={[styles.card, styles.mt2]}>
              {pages.map((item, index) => (
                <View key={index}>
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      props.navigation.navigate('PageScreen', {item: item})
                    }
                    style={[
                      styles.cardBody,
                      styles.dFlex,
                      styles.alignItemsCenter,
                      styles.justifyContentBetween,
                      styles.my2,
                    ]}>
                    <Text style={[styles.textNormal]}>{item.title}</Text>
                    <Ionicons
                      name={'chevron-forward-outline'}
                      size={16}
                      color={styles.textSecondaryColor}
                    />
                  </TouchableOpacity>
                  {index + 1 !== pages.length && (
                    <View style={[styles.cardHr]} />
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

LegalScreen.propTypes = {
  navigation: PropTypes.object,
};

export default connect(({auth}) => ({auth}))(LegalScreen);

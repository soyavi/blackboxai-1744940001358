import React, {useEffect, useState} from 'react';
import {ScrollView, ActivityIndicator, useWindowDimensions} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {SafeAreaView} from 'react-native-safe-area-context';
import NavContainer from '../../components/NavContainer';
import css from '../../Styles';
import API from '../../helpers/Axios';
import RenderHtml from 'react-native-render-html';

const TermsScreen = ({route}) => {
  const styles = css();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(null);
  const getPage = () => {
    API.post(`page/${route.params?.item.alt_name}`)
      .then(res => {
        setPage(res.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getPage();
  }, []);

  const {width} = useWindowDimensions();

  return (
    <SafeAreaView
      edges={['right', 'left', 'bottom']}
      style={[styles.bgLight, styles.flexGrow1]}>
      <NavContainer title={route.params?.item.title} />
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
        <ScrollView style={[styles.flexGrow1, styles.px4]}>
          <RenderHtml
            contentWidth={width}
            source={{
              html: `<div style="color: ${styles.textNormalColor}">${page.content}</div>`,
            }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

TermsScreen.propTypes = {
  navigation: PropTypes.object,
};

export default connect(({auth}) => ({auth}))(TermsScreen);

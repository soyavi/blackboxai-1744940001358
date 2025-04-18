// Import necessary components from React and React Native
import React from 'react';
import {Text, View} from 'react-native';

// Import FastImage for faster image rendering
import FastImage from 'react-native-fast-image';

// Import custom styles
import css from '../Styles';

// A functional component for displaying user avatar
const UserAvatar = ({url, width = 40, name = '', radius = 6, ...props}) => {
  // Apply custom styles
  const styles = css();

  // If URL is provided, display the image
  // with given width, aspect ratio, and border radius
  return url ? (
    <FastImage
      style={{
        width: width,
        aspectRatio: 1,
        borderRadius: width / 2,
      }}
      source={{
        uri: url,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  ) : (
    // If URL is not provided, display a default avatar
    <View
      style={[
        styles.bgPrimary,
        styles.alignItemsCenter,
        styles.justifyContentCenter,
        {
          width: width,
          aspectRatio: 1,
          borderRadius: radius,
        },
      ]}>
      <Text style={[styles.textWhite, styles.fwBold]}>{name.charAt(0)}</Text>
    </View>
  );
};

// Export the UserAvatar component as default
export default UserAvatar;

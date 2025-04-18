import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Animated, Easing, StyleSheet} from 'react-native';

class Indicator extends PureComponent {
  static defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,
    hideAnimationDuration: 200,

    animating: true,
    interaction: true,
    hidesWhenStopped: true,

    count: 1,
  };

  static propTypes = {
    animationEasing: PropTypes.func,
    animationDuration: PropTypes.number,
    hideAnimationDuration: PropTypes.number,

    animating: PropTypes.bool,
    interaction: PropTypes.bool,
    hidesWhenStopped: PropTypes.bool,

    renderComponent: PropTypes.func,
    count: PropTypes.number,
  };

  constructor(props) {
    super(props);

    /*
     *  0 -> 1
     *    | startAnimation
     *    | resumeAnimation
     *
     *  1 -> -1
     *    | stopAnimation
     *
     * -1 -> 0
     *    | saveAnimation
     */
    this.animationState = 0;
    this.savedValue = 0;

    let {animating} = this.props;

    this.state = {
      progress: new Animated.Value(0),
      hideAnimation: new Animated.Value(animating ? 1 : 0),
    };
  }

  componentDidMount() {
    let {animating} = this.props;

    if (animating) {
      this.startAnimation();
    }
  }

  componentDidUpdate(prevProps) {
    let {animating} = this.props;

    if (animating && !prevProps.animating) {
      this.resumeAnimation();
    }

    if (!animating && prevProps.animating) {
      this.stopAnimation();
    }

    if (animating ^ prevProps.animating) {
      let {hideAnimation} = this.state;
      let {hideAnimationDuration: duration} = this.props;

      Animated.timing(hideAnimation, {
        toValue: animating ? 1 : 0,
        duration,
      }).start();
    }
  }

  startAnimation() {
    let {progress} = this.state;
    let {interaction, animationEasing, animationDuration} = this.props;

    if (this.animationState !== 0) {
      return;
    }

    let animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver: true,
      isInteraction: interaction,
      toValue: 1,
    });

    Animated.loop(animation).start();

    this.animationState = 1;
  }

  stopAnimation() {
    let {progress} = this.state;

    if (this.animationState !== 1) {
      return;
    }

    let listener = progress.addListener(({value}) => {
      progress.removeListener(listener);
      progress.stopAnimation(() => this.saveAnimation(value));
    });

    this.animationState = -1;
  }

  saveAnimation(value) {
    let {animating} = this.props;

    this.savedValue = value;
    this.animationState = 0;

    if (animating) {
      this.resumeAnimation();
    }
  }

  resumeAnimation() {
    let {progress} = this.state;
    let {interaction, animationDuration} = this.props;

    if (this.animationState !== 0) {
      return;
    }

    Animated.timing(progress, {
      useNativeDriver: true,
      isInteraction: interaction,
      duration: (1 - this.savedValue) * animationDuration,
      toValue: 1,
    }).start(({finished}) => {
      if (finished) {
        progress.setValue(0);

        this.animationState = 0;
        this.startAnimation();
      }
    });

    this.savedValue = 0;
    this.animationState = 1;
  }

  renderComponent(item, index) {
    let {progress} = this.state;
    let {renderComponent, count} = this.props;

    if (typeof renderComponent === 'function') {
      return renderComponent({index, count, progress});
    }

    return null;
  }

  render() {
    let {hideAnimation} = this.state;
    let {count, hidesWhenStopped, ...props} = this.props;

    if (hidesWhenStopped) {
      props.style = [].concat(props.style || [], {opacity: hideAnimation});
    }

    return (
      <Animated.View {...props}>
        {Array.from(new Array(count), this.renderComponent, this)}
      </Animated.View>
    );
  }
}

export default class DotIndicator extends PureComponent {
  static defaultProps = {
    animationEasing: Easing.inOut(Easing.ease),

    color: 'rgb(0, 0, 0)',
    count: 4,
    size: 16,
  };

  static propTypes = {
    ...Indicator.propTypes,

    color: PropTypes.string,
    size: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({index, count, progress}) {
    let {size, color: backgroundColor} = this.props;

    let style = {
      width: size,
      height: size,
      margin: size / 2,
      borderRadius: size / 2,
      backgroundColor,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [
              0.0,
              (index + 0.5) / (count + 1),
              (index + 1.0) / (count + 1),
              (index + 1.5) / (count + 1),
              1.0,
            ],
            outputRange: [1.0, 1.36, 1.56, 1.06, 1.0],
          }),
        },
      ],
    };

    return <Animated.View style={style} {...{key: index}} />;
  }

  render() {
    let {style, ...props} = this.props;

    return (
      <Indicator
        style={[styles.container, style]}
        renderComponent={this.renderComponent}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

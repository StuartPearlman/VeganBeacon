import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet, View, TouchableWithoutFeedback, Animated, Easing, Platform,
} from 'react-native';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  iconContainer: {
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class RippleIcon extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    const maxOpacity = 0.12;

    this.state = {
      maxOpacity,
      scaleValue: new Animated.Value(0.01),
      opacityValue: new Animated.Value(maxOpacity),
    };

    this.renderRippleView = this.renderRippleView.bind(this);
    this.onPressedIn = this.onPressedIn.bind(this);
    this.onPressedOut = this.onPressedOut.bind(this);
  }

  onPressedIn() {
    const { scaleValue } = this.state;

    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 225,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === 'android',
    }).start();
  }

  onPressedOut() {
    const { opacityValue, scaleValue, maxOpacity } = this.state;

    Animated.timing(opacityValue, {
      toValue: 0,
      useNativeDriver: Platform.OS === 'android',
    }).start(() => {
      scaleValue.setValue(0.01);
      opacityValue.setValue(maxOpacity);
    });

    const { onPress } = this.props;
    setTimeout(() => onPress(), 110);
  }

  renderRippleView() {
    const { size, color } = this.props;
    const { scaleValue, opacityValue } = this.state;

    const rippleSize = size * 2;

    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: rippleSize,
          height: rippleSize,
          borderRadius: rippleSize / 2,
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
          backgroundColor: color || 'black',
        }}
      />
    );
  }

  render() {
    const { name, size, color } = this.props;
    const containerSize = size * 2;
    const iconContainer = { width: containerSize, height: containerSize };

    return (
      <TouchableWithoutFeedback onPressIn={this.onPressedIn} onPressOut={this.onPressedOut}>
        <View style={[styles.iconContainer, iconContainer]}>
          {this.renderRippleView()}
          <View>
            <Icon name={name} size={size} color={color} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default RippleIcon;

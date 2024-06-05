import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import ClapSvg from './ClapSvg';
import SparkleSvg from './SparkleSvg';

const MediumClap = () => {
  // states
  const [clapCount, setClapCount] = React.useState(0);

  //   shared values for animation
  const clapScale = useSharedValue(1);

  // shared values for sparkle
  const sparkleScale = useSharedValue(0);
  const sparkleOpacity = useSharedValue(0);

  // shared values for bubble
  const bubbleOpactity = useSharedValue(0);
  const bubbleTranslateY = useSharedValue(-120);

  // on tap function
  const onTap = () => {
    // increase +1
    setClapCount(clapCount + 1);

    // increase clap scale to 1.2
    clapScale.value = withSpring(1.2, {}, () => {
      clapScale.value = withSpring(1, {});
    });

    // increase sparkle size to 1 0.5: 100, 1: 300, 1.2: 400
    sparkleScale.value = withDelay(
      0,
      withSequence(
        withTiming(1, {duration: 100}),
        withTiming(1.5, {duration: 200}),
        withTiming(1.8, {duration: 300}),
      ),
    );
    // set opacity from 0: 100, 1: 300, 0: 400
    sparkleOpacity.value = withDelay(
      0,
      withSequence(
        withTiming(0, {duration: 100}),
        withTiming(1, {duration: 200}),
        withTiming(0, {duration: 300}),
      ),
    );

    // set bubble opacity
    bubbleOpactity.value = withSequence(
      withTiming(0.8, {duration: 200, easing: Easing.ease}),
      withTiming(1, {duration: 300, easing: Easing.ease}),
      withTiming(0, {duration: 350, easing: Easing.ease}),
      withTiming(0, {duration: 400, easing: Easing.ease}),
    );

    // set bubble Y value
    bubbleTranslateY.value = withSequence(
      withTiming(-150, {duration: 200, easing: Easing.ease}),
      withTiming(-150, {duration: 300, easing: Easing.ease}),
      withTiming(-180, {duration: 350, easing: Easing.ease}),
      withTiming(-120, {duration: 400, easing: Easing.ease}),
    );
  };

  //   create clap animation
  const clapAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: clapScale.value,
        },
      ],
    };
  });

  //   create sparke animation
  const sparkleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: sparkleOpacity.value,
      transform: [
        {
          scale: sparkleScale.value,
        },
      ],
    };
  });

  // create bubble animation
  const bubbleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: bubbleOpactity.value,
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#000',

      justifyContent: 'center',
      alignItems: 'center',

      transform: [
        {
          translateY: bubbleTranslateY.value,
        },
      ],
    };
  });

  // to handle the tap state
  // when directly call the onTap() function, the clap count increase to +3, in one tap.
  // so here we make sure to call the onTap() function only when the tap state is equal to "End"
  const onHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.state === State.END) {
      onTap();
    }
  };

  return (
    <TapGestureHandler onHandlerStateChange={onHandlerStateChange}>
      <Animated.View>
        <Animated.View style={clapAnimatedStyle}>
          <ClapSvg />
        </Animated.View>
        <Text style={styles.clapText}>{clapCount}</Text>

        <Animated.View style={bubbleAnimatedStyle}>
          <Text style={styles.text}>+{clapCount}</Text>
        </Animated.View>

        <Animated.View style={[styles.sparkleStyle, sparkleAnimatedStyle]}>
          <SparkleSvg />
        </Animated.View>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default MediumClap;

const styles = StyleSheet.create({
  sparkleStyle: {
    position: 'absolute',
    top: -50,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  text: {
    color: '#fff',
  },
  clapText: {
    position: 'absolute',
    top: 20,
    left: 80,
    fontSize: 18,
  },
});

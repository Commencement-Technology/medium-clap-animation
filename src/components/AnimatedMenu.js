import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import React from 'react';
import menuData from '../dummyData/menuData';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  useDerivedValue,
} from 'react-native-reanimated';

const AnimatedMenu = () => {
  const [showSubs, setShowSubs] = React.useState(null);

  const menuTranslateY = useSharedValue(0);
  const isExpanded = useSharedValue(true);
  const height = useSharedValue(0);

  const onTap = index => {
    // setShow
    setShowSubs(index);
    menuTranslateY.value = withTiming(-showSubs * 20, {
      duration: 100,
      easing: Easing.ease,
    });
  };

  const menuAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: menuTranslateY.value,
        },
      ],
    };
  });

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration: 500,
    }),
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));
  const handleOnTap = ({nativeEvent}) => {
    console.log('native event', nativeEvent);

    // onTap();
  };
  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      contentContainerStyle={{justifyContent: 'space-evenly'}}>
      {menuData.map((menu, index) => (
        <TapGestureHandler>
          <Animated.View
            key={index}
            onLayout={e => {
              height.value = e.nativeEvent.layout.height;
            }}
            style={[
              {backgroundColor: menu.color},
              styles.itemContainer,
              bodyStyle,
            ]}>
            <Text style={styles.text}>{menu.title}</Text>

            {/* <Animated.View>
              {showSubs == index &&
                menu.subs.map((sub, index) => (
                  <Text style={styles.sub}>* {sub}</Text>
                ))}
            </Animated.View> */}
          </Animated.View>
        </TapGestureHandler>
      ))}
    </ScrollView>
  );
};

export default AnimatedMenu;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: menuData[0].color,
  },
  itemContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 5,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 42,
    color: '#fff',
    textAlign: 'center',
  },
  sub: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 5,
    textAlign: 'center',
  },
});

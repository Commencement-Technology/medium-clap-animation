import {View, StyleSheet} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MediumClap from './src/components/MediumClap';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <MediumClap />
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dce775',
  },
});

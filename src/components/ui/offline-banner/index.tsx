import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MD2Colors } from 'react-native-paper';
import Text from '../text';

const Offline = () => {
  return (
    <View style={styles.bottomBar}>
      <Text style={styles.offlineText}>No connection</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: MD2Colors.red800,
    width: '100%',
    padding: 2,
  },
  offlineText: {
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default Offline;

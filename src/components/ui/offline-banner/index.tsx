import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { MD2Colors } from 'react-native-paper';
import Box from '../box';
import Text from '../text';

const UiOffline = () => {
  return (
    <Box style={styles.bottomBar}>
      <Text style={styles.offlineText}>No connection</Text>
    </Box>
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

export default memo(UiOffline);

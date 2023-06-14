import theme from '@config/index';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Box from '../box';
import Text from '../text';

export const BarcodeEdit = ({ onDismiss }: any) => {
  const [value, setValue] = useState(1);
  const [text, setText] = useState('');

  return (
    <Box>
      <Box flexDirection="row" gap={4}>
        <Text
          onPress={() => setValue(1)}
          style={value === 1 ? styles.tabButton : styles.tabButtonActive}
        >
          KG Barkodu
        </Text>
        <Text
          onPress={() => setValue(2)}
          style={value === 2 ? styles.tabButton : styles.tabButtonActive}
        >
          Müşteri Barkodu
        </Text>
        <Text
          onPress={() => setValue(3)}
          style={value === 3 ? styles.tabButton : styles.tabButtonActive}
        >
          Grup Barkodu
        </Text>
      </Box>
      <Box mt={8}>
        <TextInput
          mode="outlined"
          placeholder="Barkod kodunu giriniz"
          style={{
            fontSize: 14,
            width: '100%',
            color: theme.colors.default,
            backgroundColor: 'white',
          }}
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </Box>
      <Box flexDirection="row" justifyContent="flex-end" pb={12} mt={8} gap={4}>
        <Button mode="text" onPress={onDismiss}>
          İptal
        </Button>
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Tamam
        </Button>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    color: 'white',
    fontSize: 12,
  },
  tabButtonActive: {
    padding: 10,
    backgroundColor: theme.colors.default,
    borderRadius: 8,
    color: theme.colors.color,
    fontSize: 12,
  },
});

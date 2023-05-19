import { Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { MD2Colors, TextInput } from 'react-native-paper';
import theme from '@config/index';

const UITextInput = ({
  label,
  name,
  rules,
  placeholder = '',
  testID = 'InputText',
  mode = 'outlined',
  error,
  control,
  ...props
}: {
  label: string;
  name: string;
  rules?: any;
  placeholder?: string;
  testID?: string;
  mode: 'flat' | 'outlined';
  props?: any;
  error: boolean;
  control: any;
}) => {
  return (
    <View style={styles.wrapper}>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            error={error}
            {...props}
            label={label}
            style={styles.field}
            placeholder={placeholder}
            testID={testID}
            mode={mode}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 12,
  },
  field: {
    fontSize: 14,
    width: '100%',
    color: theme.colors.default,
    backgroundColor: 'white',
  },
  errorMessage: {
    color: MD2Colors.red800,
    fontSize: 12,
  },
  placeholderStyle: {
    color: '#eeeeee',
  },
});

export default UITextInput;

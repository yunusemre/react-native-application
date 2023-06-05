import { Picker } from '@react-native-picker/picker';
import theme from '../../../config';
import Box from '../box';

const UiPicker = ({
  onValueChange,
  stylesWrapper,
  testID,
  selectedValue,
  minWidth,
  items,
  style,
  mode = 'dropdown',
  ...props
}: any) => {
  return (
    <Box
      borderWidth={1}
      borderColor={theme.colors.default}
      borderRadius={theme.radius.normal}
      mr={4}
      bg="white"
      height={40}
    >
      <Picker
        dropdownIconColor={theme.colors.primary}
        mode={mode}
        testID={testID}
        style={[{ color: theme.colors.primary, marginTop: -8 }, style]}
        {...props}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {items.map((item: any, index: number) => (
          <Picker.Item key={index} label={item.name} value={item.value} />
        ))}
      </Picker>
    </Box>
  );
};

export default UiPicker;

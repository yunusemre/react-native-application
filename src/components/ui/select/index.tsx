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
  mode = 'popup',
  ...props
}: any) => {
  return (
    <Box
      borderWidth={1}
      mr={5}
      borderColor={theme.colors.borderColor}
      borderRadius={theme.radius.full}
    >
      <Picker
        dropdownIconColor={theme.colors.primary}
        mode={mode}
        testID={testID}
        style={{
          ...style,
          marginTop: -6,
          paddingLeft: 0,
          paddingRight: 0,
          color: theme.colors.primary,
          alignItems: 'center',
          width: 'auto',
          minWidth: minWidth,
          height: 40,
          borderColor: theme.colors.borderColor,
          borderWidth: 1,
        }}
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

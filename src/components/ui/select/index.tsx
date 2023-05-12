import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';
import theme from '../../../config';

const UiPicker = ({
  onValueChange,
  stylesWrapper,
  testID,
  selectedValue,
  items,
  ...props
}: any) => {
  return (
    <View style={[stylesWrapper, styles.wrapper]}>
      <Picker
        mode="dropdown"
        testID={testID}
        style={{ alignItems: 'center' }}
        {...props}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {items.map((item: any, index: number) => (
          <Picker.Item key={index} {...item} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    flex: 1,
    maxHeight: 50,
    borderColor: theme.colors.borderColor,
    borderRadius: theme.radius.normal,
  },
});

export default UiPicker;

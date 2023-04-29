import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';
import AppColors from '../../../config/colors';
import AppTypography from '../../../config/typography';

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
    borderColor: AppColors.borderColor,
    borderRadius: AppTypography.roundness,
  },
});

export default UiPicker;

import React, { useState } from 'react';
import { Checkbox, Text } from 'react-native-paper';
import Box from '../box';

const UiCard = (props: any) => {
  const { barcode, id, date } = props;
  const [checked, setChecked] = useState(false);

  return (
    <Box ml={8} mr={8} mt={8} p={2} borderRadius={8} bg="borderColor">
      <Box flexDirection="row" minHeight={60}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Box width={'85%'}>
          <Text>Barkod: {barcode}</Text>
          <Text variant="labelSmall">Id: {id}</Text>
          <Text variant="labelSmall">Tarih: {date}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default UiCard;

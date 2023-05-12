import React, { useState } from 'react';
import { Checkbox, IconButton, Menu, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Box from '../box';
import mores from './more';

const UiCard = (props: any) => {
  const [checked, setChecked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Box ml={8} mr={8} mt={8} p={2} borderRadius={8} bg={props.color ? 'danger' : 'borderColor'}>
      <Box flexDirection="row" minHeight={60}>
        <Box width={'15%'} alignItems="center">
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          {props.color && <Icon name="alarm" size={18} />}
          <Icon name="hours-24" size={18} />
        </Box>
        <Box width={'85%'}>
          <Text>Teknosa</Text>
          <Text variant="labelMedium">Soğanlık Yeni Mah Alataş Sk. No: 2 Kat: 1 No: 1</Text>
          <Text variant="labelSmall">Müşteri Takip No: -</Text>
          <Text variant="labelSmall">Parça Sayısı: 4</Text>
          <Text variant="labelSmall">Atandı</Text>
        </Box>
        <Menu
          visible={showMenu}
          onDismiss={() => setShowMenu(false)}
          anchor={
            <IconButton
              mode="outlined"
              style={{ position: 'absolute', bottom: -5, right: -5 }}
              icon="dots-vertical"
              size={20}
              onPress={() => setShowMenu(!showMenu)}
            />
          }
        >
          {mores.map((item: any) => (
            <Menu.Item
              key={item.name}
              onPress={() => {
                setShowMenu(false);
              }}
              title={item.name}
            />
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default UiCard;

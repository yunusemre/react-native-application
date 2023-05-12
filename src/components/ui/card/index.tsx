import React, { useState } from 'react';
import { Checkbox, IconButton, Menu, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Box from '../box';
import mores from './more';

const UiCard = (props: any) => {
  const [checked, setChecked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  return (
    <Box border={0.5} borderColor="borderColor" borderRadius={8} mt={8} pt={4} pb={4} bg="white">
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
          <Box style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <Menu
              style={{ backgroundColor: 'white' }}
              visible={showMenu}
              onDismiss={() => setShowMenu(false)}
              anchor={
                <IconButton size={14} icon="dots-vertical" onPress={() => setShowMenu(!showMenu)} />
              }
            >
              {mores.map((item: any) => (
                <Menu.Item
                  style={{ backgroundColor: 'white' }}
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
      </Box>
    </Box>
  );
};

export default UiCard;

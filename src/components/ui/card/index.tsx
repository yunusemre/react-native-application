import React, { useState } from 'react';
import { Badge, Checkbox, IconButton, Menu, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../config';
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
          <Badge
            size={18}
            style={{
              position: 'absolute',
              top: 4,
              right: 6,
              backgroundColor: 'white',
              color: theme.colors.primary,
              borderWidth: 1,
              borderColor: theme.colors.primary,
              zIndex: 12,
            }}
          >
            {props.index}
          </Badge>
          <Text>Teknosa</Text>
          <Text variant="labelMedium">Soğanlık Yeni Mah Alataş Sk. No: 2 Kat: 1 No: 1</Text>
          <Text variant="labelSmall">Müşteri Takip No: -</Text>
          <Text variant="labelSmall">Parça Sayısı: 4</Text>
          <Text variant="labelSmall">Atandı</Text>
          <Box style={{ position: 'absolute', bottom: -10, right: -6 }}>
            <Box
              as={Menu}
              visible={showMenu}
              onDismiss={() => setShowMenu(false)}
              anchor={
                <IconButton size={14} icon="dots-vertical" onPress={() => setShowMenu(!showMenu)} />
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
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UiCard;

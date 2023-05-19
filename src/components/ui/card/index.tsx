import theme from '@config/index';
import React, { useState } from 'react';
import { Badge, Checkbox, IconButton, Menu, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Box from '../box';
import mores from './more';

interface ICard {}

const UiCard = (props: any) => {
  const [checked, setChecked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Box
      border={0.5}
      borderColor="borderColor"
      borderRadius={8}
      mt={8}
      pt={4}
      pb={4}
      bg='white'
      color="white"
    >
      <Box flexDirection="row" minHeight={60}>
        <Box width={'15%'} alignItems="center">
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Box
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="center"
            width={70}
            pl={12}
            pr={12}
          >
            {/* {CompletionTime === null && (
              <Icon
                onPress={() =>
                  modalOutput('09:00-18:00 saatleri arasında toplama işlemi yapılacaktır.')
                }
                name="alarm"
                size={18}
              />
            )} */}
            <Icon name="hours-24" size={18} />
            <Icon name="check-circle-outline" size={18} />
          </Box>
        </Box>
        <Box width={'85%'}>
          <Badge
            size={18}
            style={{
              position: 'absolute',
              top: 4,
              right: 6,
              backgroundColor: 'transparent',
              color: theme.colors.color,
              borderWidth: 1,
              borderColor: theme.colors.color,
              fontWeight: 'bold',
              zIndex: 12,
            }}
          >
            {props.index}
          </Badge>
          <Icon
            style={{
              position: 'absolute',
              top: 24,
              right: 6,
              backgroundColor: 'transparent',
              color: theme.colors.color,
              fontWeight: 'bold',
              zIndex: 12,
            }}
            name={props.TaskStatus === 1 ? 'call-merge' : 'call-split'}
            size={18}
          />
          <Text style={{ width: '90%', fontWeight: 'bold' }}>{props.PartyDto.Name}</Text>
          <Text style={{ width: '90%' }} variant="labelMedium">
            {props.PartyDto.AddressText}
          </Text>
          <Text variant="labelSmall">Müşteri Takip No: -</Text>
          <Text variant="labelSmall">Parça Sayısı: 12</Text>
          <Text variant="labelSmall" style={{ fontWeight: 'bold' }}>
            Atandı
          </Text>
          <Box style={{ position: 'absolute', bottom: -10, right: -7 }}>
            <Box
              as={Menu}
              visible={showMenu}
              onDismiss={() => setShowMenu(false)}
              anchor={
                <IconButton size={18} icon="dots-vertical" onPress={() => setShowMenu(!showMenu)} />
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

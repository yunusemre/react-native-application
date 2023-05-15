import React, { useState } from 'react';
import { Badge, Checkbox, IconButton, Menu, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../config';
import Box from '../box';
import mores from './more';

interface ICard {
  index: number;
  TaskId: number;
  TotalItemCount: number;
  TaskType: number;
  TaskStatus: number;
  CompletionTime: Date | null;
  Title: string;
  AddressText: string;
  Latitude: number;
  Longitude: number;
  Gsm: string;
  ShipmentStatus: number;
  modalOutput: (val: string) => void;
  Recipient: {
    RecipientName: string;
    RecipientSurname: string;
  };
}

const UiCard = ({
  index,
  TaskId,
  TaskType,
  TaskStatus,
  CompletionTime,
  TotalItemCount,
  Title,
  AddressText,
  Latitude,
  Longitude,
  Gsm: string,
  ShipmentStatus,
  modalOutput,
  Recipient: { RecipientName, RecipientSurname },
}: ICard) => {
  const [checked, setChecked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState('');

  return (
    <Box
      border={0.5}
      borderColor="borderColor"
      borderRadius={8}
      mt={8}
      pt={4}
      pb={4}
      bg={CompletionTime === null ? 'danger' : 'white'}
      color={CompletionTime === null ? 'white' : ''}
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
            {CompletionTime === null && (
              <Icon
                onPress={() =>
                  modalOutput('09:00-18:00 saatleri arasında toplama işlemi yapılacaktır.')
                }
                name="alarm"
                size={18}
              />
            )}
            <Icon
              onPress={() => modalOutput('24 Saat içerisinde teslim edilmesi gerekiyor')}
              name="hours-24"
              size={18}
            />
            <Icon
              onPress={() => modalOutput('Toplama işlemi tamamlandı')}
              name="check-circle-outline"
              size={18}
            />
          </Box>
        </Box>
        <Box width={'85%'}>
          <Badge
            onPress={() => modalOutput('24 Saat içerisinde teslim edilmesi gerekiyor')}
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
            {index}
          </Badge>
          <Icon
            onPress={() => modalOutput(TaskStatus === 1 ? 'Toplama' : 'Dağıtım')}
            style={{
              position: 'absolute',
              top: 24,
              right: 6,
              backgroundColor: 'transparent',
              color: theme.colors.color,
              fontWeight: 'bold',
              zIndex: 12,
            }}
            name={TaskStatus === 1 ? 'call-merge' : 'call-split'}
            size={18}
          />
          <Text style={{ width: '90%' }}>{Title}</Text>
          <Text style={{ width: '90%' }} variant="labelMedium">
            {AddressText}
          </Text>
          <Text variant="labelSmall">Müşteri Takip No: -</Text>
          <Text variant="labelSmall">Parça Sayısı: {TotalItemCount}</Text>
          <Text variant="labelSmall" style={{ fontWeight: 'bold' }}>
            Atandı
          </Text>
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

import theme from '@config/index';
import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Badge, Checkbox, IconButton, Menu, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Box from '../box';

const UiCard = ({
  PartyDto,
  index,
  TaskStatus,
  navigation,
  IsReturn,
}: {
  PartyDto: PartyDtoModel;
  index: number;
  TaskStatus: number;
  navigation: any;
  IsReturn: number;
}) => {
  const { Name, AddressText, Latitude, Longitude } = PartyDto;
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
      bg="white"
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
            <Icon name="alarm" size={18} />
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
            {index}
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
            // name={IsReturn === 1 ? 'call-merge' : 'call-split'}
            name="call-merge"
            size={18}
          />
          <Text style={{ width: '90%', fontWeight: 'bold' }}>{Name}</Text>
          <Text style={{ width: '90%' }} variant="labelMedium">
            {AddressText}
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
              <Menu.Item title="Görev Tamamla" />
              <Menu.Item title="Adres Bulunamadı" />
              <Menu.Item title="Görev İptal" />
              <Menu.Item title="Randevu Gir" />
              <Menu.Item title="Adres Problemli" />
              <Menu.Item title="Müşteriyi Arama" />
              <Menu.Item
                title="Adrese Git"
                onPress={() =>
                  navigation.navigate('mapping', {
                    Latitude: Latitude,
                    Longitude: Longitude,
                  })
                }
              />
              <Menu.Item
                title="Navigasyonu Aç"
                onPress={() =>
                  Linking.openURL(`http://maps.google.com/maps?daddr=${Latitude}, ${Longitude}`)
                }
              />
              <Menu.Item title="İş Yeri Kapalı" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UiCard;

import { Chip, Menu } from 'react-native-paper';

const MoreButton = ({ data, show, openMenu, closeMenu, title, selected }: any) => {
  return (
    <Menu
      visible={show}
      onDismiss={closeMenu}
      anchor={
        <Chip style={{ marginRight: 5 }} icon="dots-vertical" onPress={openMenu} mode="outlined">
          {title}
        </Chip>
      }
    >
      {data.map((item: any) => (
        <Menu.Item key={item.name} onPress={() => selected(item)} title={item.name} />
      ))}
    </Menu>
  );
};

export default MoreButton;

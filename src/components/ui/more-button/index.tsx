import { Button, Menu } from 'react-native-paper';

const MoreButton = ({ showDropDown, setShowDropDown, closeMenu, title }: any) => {
  return (
    <Menu
      visible={showDropDown}
      anchor={
        <Button icon="dots-vertical" mode="outlined" onPress={() => setShowDropDown(true)}>
          {title}
        </Button>
      }
      onDismiss={closeMenu}
    >
      <Menu.Item title="option" />
    </Menu>
  );
};

export default MoreButton;

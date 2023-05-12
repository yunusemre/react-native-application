import { Button, Menu } from 'react-native-paper';

const MoreButton = ({
  data,
  icon = 'dots-vertical',
  width = '100%',
  show,
  style,
  openMenu,
  closeMenu,
  title,
  selected,
}: any) => {
  return (
    <Menu
      visible={show}
      onDismiss={closeMenu}
      anchor={
        <Button
          contentStyle={{ flexDirection: 'row-reverse' }}
          icon={icon}
          style={[style, { width: width }]}
          onPress={openMenu}
          mode="outlined"
        >
          {title}
        </Button>
      }
    >
      {data.map((item: any) => (
        <Menu.Item
          style={{ backgroundColor: 'white' }}
          key={item.name}
          onPress={() => selected(item)}
          title={item.name}
        />
      ))}
    </Menu>
  );
};

export default MoreButton;

import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CustomMenu = ({ buttonText, menuItems }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <Menu>
      <MenuButton
        
      >
        {buttonText}
      </MenuButton>
      <MenuList>
        {menuItems.map((item, index) => (
          <MenuItem key={index} onClick={() => navigate(`/${item.title}`)}>
            {item.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CustomMenu;

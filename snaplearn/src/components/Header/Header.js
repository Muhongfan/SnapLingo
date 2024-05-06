import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import Avatar from "@mui/joy/Avatar";
import { useNavigate } from "react-router-dom";
import { useColorScheme } from "@mui/joy/styles";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import CustomMenu from "../../components/Menu/Menu";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";

import "./Header.scss";

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light");
        onClick?.(event);
      }}
      {...other}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}
const menuItems = [
  {
    title: "Gallery",
  },
  {
    title: "Category",
  },
  {
    title: "Capture",
  },
  {
    title: "Social",
  },
];
const Navbar = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [isMobile, setIsMobile] = useState(null);
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (route) => {
    navigate(route);
    setActiveButton(route);
    console.log(activeButton);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    handleResize(); // Initial call to set screen size on component mount

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="main-navbar" className="navbar">
      <div className="navbar__menu">
        <Button onClick={() => navigate("/")}>
          <h2 className="navbar__logo">SnapLearn</h2>
        </Button>

        {isMobile ? (
          <div className="navbar__mobile">
            <CustomMenu buttonText="Menu" menuItems={menuItems} />
          </div>
        ) : (
          <nav>
            <ul>
              <li
                className={
                  activeButton === "/Gallery"
                    ? "activesState buttonWithStyles"
                    : "buttonWithStyles"
                }
              >
                <button onClick={() => handleButtonClick("/Gallery")}>
                  Gallery
                </button>{" "}
              </li>
              <li
                className={
                  activeButton === "/Category"
                    ? "activesState buttonWithStyles"
                    : "buttonWithStyles"
                }
              >
                <button onClick={() => handleButtonClick("/Category")}>
                  Category
                </button>{" "}
              </li>
              <li
                className={
                  activeButton === "/Capture"
                    ? "activesState buttonWithStyles"
                    : "buttonWithStyles"
                }
              >
                <button onClick={() => handleButtonClick("/Capture")}>
                  Capture
                </button>{" "}
              </li>
              <li
                className={
                  activeButton === "/Social"
                    ? "activesState buttonWithStyles"
                    : "buttonWithStyles"
                }
              >
                <button onClick={() => handleButtonClick("/Social")}>
                  Social
                </button>{" "}
              </li>
            </ul>
          </nav>
        )}
      </div>
      <div className="navbar__login">
        <button onClick={() => navigate("/login")} className="profile">
          <Avatar />
        </button>

        {/* <ColorSchemeToggle /> */}
      </div>
    </div>
  );
};
export default Navbar;

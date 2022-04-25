import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { Menu as MenuIcon } from "react-feather";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { User } from "react-feather";

import { StyledLink, StyledMyProfileLink } from "./HeaderStyles";
import { useAuth } from "../../state";

const nonLoggedUserPages = [
  { path: "/", content: "Register" },
  { path: "/login", content: "Login" },
  { path: "/feedback", content: "Feedback" },
  { path: "/newest", content: "The newest" },
];

const loggedUserPages = [
  { path: "/", content: "Feedback" },
  { path: "/newest", content: "The newest" },
];

const Header = () => {
  const isLoggedIn = useAuth((state) => state.isLoggedIn);
  const setLoggedOut = useAuth((state) => state.setLoggedOut);
  const navigation = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (path: string) => {
    setAnchorElNav(null);
    navigation(path);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    setAnchorElUser(null);
    setLoggedOut(false);
    navigation("/");
  };

  return (
    <AppBar position="static">
      {isLoggedIn ? (
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <StyledLink to={"/"}>LOGO</StyledLink>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {loggedUserPages.map((page) => (
                  <MenuItem
                    key={page.path}
                    onClick={() => {
                      handleCloseNavMenu(page.path);
                    }}
                  >
                    <Typography textAlign="center">{page.content}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <StyledLink to={"/"}>LOGO</StyledLink>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {loggedUserPages.map((page) => (
                <Button
                  key={page.path}
                  onClick={() => {
                    handleCloseNavMenu(page.path);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.content}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, cursor: "pointer" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <User style={{ color: "white" }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <StyledMyProfileLink to={"/my-profile"}>
                    My profile
                  </StyledMyProfileLink>
                </MenuItem>
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      ) : (
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <StyledLink to={"/"}>LOGO</StyledLink>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {nonLoggedUserPages.map((page) => (
                  <MenuItem
                    key={page.path}
                    onClick={() => {
                      handleCloseNavMenu(page.path);
                    }}
                  >
                    <Typography textAlign="center">{page.content}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <StyledLink to={"/"}>LOGO</StyledLink>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {nonLoggedUserPages.map((page) => (
                <Button
                  key={page.path}
                  onClick={() => {
                    handleCloseNavMenu(page.path);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.content}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      )}
    </AppBar>
  );
};
export default Header;

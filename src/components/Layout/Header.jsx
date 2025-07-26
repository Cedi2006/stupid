import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Button,
  styled,
  alpha,
} from '@mui/material';
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  People as PeopleIcon,
  Notifications as NotificationsIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext.jsx';
import { colors } from '../../components/styles/theme.js';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: colors.white,
  borderBottom: `1px solid ${colors.greyMedium}`,
  boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
  zIndex: theme.zIndex.drawer + 1,
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.5rem',
  color: colors.blue,
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    color: colors.blue,
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '2px',
  backgroundColor: alpha(colors.greyLight, 0.8),
  border: `1px solid ${colors.greyMedium}`,
  '&:hover': {
    backgroundColor: alpha(colors.greyLight, 1),
  },
  '&:focus-within': {
    border: `2px solid ${colors.blue}`,
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: '100%',
  maxWidth: '280px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.greyDark,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: colors.greyText,
  fontSize: '0.875rem',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const NavButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderRadius: 0,
  color: active ? colors.blue : colors.greyDark,
  borderBottom: active ? `2px solid ${colors.blue}` : '2px solid transparent',
  '&:hover': {
    backgroundColor: colors.greyLight,
  },
}));

const NavText = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  marginTop: theme.spacing(0.5),
}));

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
}));

const ProfileName = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  fontWeight: 500,
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(0.5),
  color: colors.greyText,
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Fake notifications
  const notifications = [
    { id: 1, text: 'Bravo ! Vous venez de battre votre record de Netflix : 14h d\'affilée !', time: 'il y a 2h' },
    { id: 2, text: 'Jean-Michel a commenté votre inactivité: "Impressionnant !"', time: 'il y a 5h' },
    { id: 3, text: 'Nouvelle offre d\'emploi qui ne vous intéressera pas', time: 'hier' },
    { id: 4, text: 'Rappel: cela fait 258 jours que vous cherchez un emploi', time: 'il y a 2 jours' },
  ];

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        {/* Logo */}
        <Logo onClick={() => navigate('/dashboard')}>LinkedOut</Logo>

        {/* Search */}
        <SearchContainer>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Rechercher…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </SearchContainer>

        <Box sx={{ flexGrow: 1 }} />

        {/* Navigation */}
        <Box sx={{ display: 'flex' }}>
          <NavButton 
            onClick={() => navigate('/dashboard')}
            active={isActive('/dashboard')}
          >
            <HomeIcon />
            <NavText>Accueil</NavText>
          </NavButton>
          <NavButton 
            onClick={() => navigate('/network')}
            active={isActive('/network')}
          >
            <PeopleIcon />
            <NavText>Réseau</NavText>
          </NavButton>
          <NavButton 
            onClick={() => navigate('/jobs')}
            active={isActive('/jobs')}
          >
            <WorkIcon />
            <NavText>Emplois</NavText>
          </NavButton>
          
          {/* Notifications */}
          <NavButton onClick={handleNotificationsOpen}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
            <NavText>Notifications</NavText>
          </NavButton>
          <Menu
            anchorEl={notificationsAnchor}
            open={Boolean(notificationsAnchor)}
            onClose={handleNotificationsClose}
            PaperProps={{
              sx: { width: 320, maxHeight: 400, mt: 1.5 },
            }}
          >
            <Typography variant="h6" sx={{ px: 2, py: 1, fontWeight: 600 }}>
              Notifications
            </Typography>
            {notifications.map(notification => (
              <MenuItem key={notification.id} onClick={handleNotificationsClose}>
                <Box sx={{ py: 0.5 }}>
                  <Typography variant="body2">{notification.text}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>

          {/* Profile */}
          <ProfileContainer onClick={handleProfileMenuOpen}>
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: '0.75rem',
                bgcolor: colors.blue,
                color: colors.white,
              }}
            >
              {user ? getUserInitials(user.name) : 'U'}
            </Avatar>
            <ProfileName>
              {user ? user.name.split(' ')[0] : 'User'}
            </ProfileName>
            <ArrowDropDownIcon fontSize="small" sx={{ color: colors.greyDark }} />
          </ProfileContainer>
          <Menu
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={handleProfileMenuClose}
            PaperProps={{
              sx: { width: 220, mt: 1.5 },
            }}
          >
            <MenuItem onClick={() => {
              handleProfileMenuClose();
              navigate('/profile');
            }}>
              <Typography variant="body2">Mon profil</Typography>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <Typography variant="body2">Paramètres</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography variant="body2">Déconnexion</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
}

export default Header;

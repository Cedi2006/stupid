import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  List,
  Divider,
  Chip,
  styled,
} from '@mui/material';
import {
  Search as SearchIcon,
  PersonAdd as PersonAddIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import Header from '../components/Layout/Header.jsx';
import SidebarLeft from '../components/Layout/SidebarLeft.jsx';
import SidebarRight from '../components/Layout/SidebarRight.jsx';
import { useAuth } from '../Context/AuthContext.jsx';
import { colors } from '../components/styles/theme.js';
import { SAMPLE_USERS } from '../data/mockData.js';

const NetworkContainer = styled(Container)(({ theme }) => ({
  maxWidth: '1200px !important',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 3),
  },
}));

const MainLayout = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  marginTop: theme.spacing(10),
  minHeight: 'calc(100vh - 80px)',
}));

const MainContent = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '550px',
  margin: '0 auto',
  [theme.breakpoints.up('lg')]: {
    margin: 0,
  },
}));

const NetworkCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: colors.white,
  border: `1px solid ${colors.greyMedium}`,
  borderRadius: theme.spacing(1),
}));

const UserCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(2),
  backgroundColor: colors.white,
  border: `1px solid ${colors.greyMedium}`,
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const ConnectButton = styled(Button)(({ theme }) => ({
  backgroundColor: colors.blue,
  color: colors.white,
  borderRadius: theme.spacing(3),
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#1E3A6F',
  },
}));

function Network() {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [connectionRequests, setConnectionRequests] = useState([]);

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      <Header />
      <NetworkContainer>
        <MainLayout>
          <SidebarLeft />
          <MainContent>
            <NetworkCard>
              <CardContent>
                <Typography variant="h5" fontWeight={700} mb={2} color={colors.blue}>
                  Mon réseau
                </Typography>
                <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
                  <Tab label="Suggestions" />
                  <Tab label="Demandes" />
                  <Tab label="Contacts" />
                </Tabs>
                <Box mt={2} mb={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Divider />
              </CardContent>
            </NetworkCard>
            <List>
              {SAMPLE_USERS.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map(user => (
                <UserCard key={user.id}>
                  <Avatar>{getUserInitials(user.name)}</Avatar>
                  <Box ml={2} flex={1}>
                    <Typography fontWeight={600}>{user.name}</Typography>
                    <Typography variant="body2" color={colors.greyDark}>{user.title}</Typography>
                  </Box>
                  <ConnectButton>
                    <PersonAddIcon /> Connecter
                  </ConnectButton>
                </UserCard>
              ))}
            </List>
          </MainContent>
          <SidebarRight />
        </MainLayout>
      </NetworkContainer>
    </>
  );
}

export default Network;

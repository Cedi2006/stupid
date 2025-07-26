import React from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  styled,
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import Header from '../components/Layout/Header.jsx';
import SidebarLeft from '../components/Layout/SidebarLeft.jsx';
import SidebarRight from '../components/Layout/SidebarRight.jsx';
import { useAuth } from '../Context/AuthContext.jsx';
import { colors } from './styles/theme.js';
import { BADGE_DEFINITIONS } from '../data/mockData.js';

const ProfileContainer = styled(Container)(({ theme }) => ({
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

const ProfileCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: colors.white,
  border: `1px solid ${colors.greyMedium}`,
  borderRadius: theme.spacing(1),
  overflow: 'visible',
  position: 'relative',
}));

const CoverBox = styled(Box)(({ theme }) => ({
  height: '120px',
  background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.yellow} 100%)`,
  borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  position: 'absolute',
  top: '60px',
  left: theme.spacing(3),
  border: `4px solid ${colors.white}`,
  backgroundColor: colors.blue,
  color: colors.white,
  fontSize: '2rem',
  fontWeight: 600,
}));

const BadgeItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  border: `1px solid ${colors.greyMedium}`,
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

function Profile() {
  const { user } = useAuth();

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
      <ProfileContainer>
        <MainLayout>
          <SidebarLeft />
          <MainContent>
            <ProfileCard>
              <CoverBox />
              <ProfileAvatar>{getUserInitials(user?.name || 'U')}</ProfileAvatar>
              <CardContent>
                <Typography variant="h5" fontWeight={700} mb={2} color={colors.blue}>
                  {user?.name || 'Utilisateur'}
                </Typography>
                <Typography variant="body2" color={colors.greyDark} mb={2}>
                  {user?.title || 'Titre du profil'}
                </Typography>
                <Divider />
                <Box mt={2}>
                  <Typography fontWeight={600} mb={1} color={colors.blue}>
                    Badges
                  </Typography>
                  <List>
                    {BADGE_DEFINITIONS.map(badge => (
                      <BadgeItem key={badge.id}>
                        <Chip label={badge.label} color="primary" />
                        <Box ml={2}>{badge.description}</Box>
                      </BadgeItem>
                    ))}
                  </List>
                </Box>
              </CardContent>
            </ProfileCard>
          </MainContent>
          <SidebarRight />
        </MainLayout>
      </ProfileContainer>
    </>
  );
}

export default Profile;

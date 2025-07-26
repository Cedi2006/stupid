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
  keyframes,
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Star as StarIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import Header from '../components/Layout/Header.jsx';
import SidebarLeft from '../components/Layout/SidebarLeft.jsx';
import SidebarRight from '../components/Layout/SidebarRight.jsx';
import { useAuth } from '../Context/AuthContext.jsx';
import { colors } from './styles/theme.js';
import { BADGE_DEFINITIONS } from '../data/mockData.js';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(30, 64, 175, 0.4); }
  50% { box-shadow: 0 0 30px rgba(245, 158, 11, 0.6), 0 0 40px rgba(30, 64, 175, 0.4); }
`;

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
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '24px',
  overflow: 'visible',
  position: 'relative',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
  },
}));

const CoverBox = styled(Box)(({ theme }) => ({
  height: '160px',
  background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #60a5fa 50%, #fbbf24 75%, #f59e0b 100%)',
  backgroundSize: '400% 400%',
  borderRadius: '24px 24px 0 0',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)',
    backgroundSize: '200px 100%',
    animation: `${shimmer} 3s infinite`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50px',
    background: 'linear-gradient(to top, rgba(255,255,255,0.8), transparent)',
  },
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 140,
  height: 140,
  position: 'absolute',
  top: '90px',
  left: theme.spacing(3),
  border: '6px solid rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  backgroundColor: 'linear-gradient(135deg, #1e40af 0%, #f59e0b 100%)',
  background: 'linear-gradient(135deg, #1e40af 0%, #f59e0b 100%)',
  color: colors.white,
  fontSize: '2.5rem',
  fontWeight: 700,
  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
  animation: `${glow} 3s ease-in-out infinite`,
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    animation: `${float} 2s ease-in-out infinite, ${glow} 3s ease-in-out infinite`,
  },
}));

const UserName = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e40af 0%, #f59e0b 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontWeight: 800,
  fontSize: '2rem',
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const UserTitle = styled(Typography)(({ theme }) => ({
  color: colors.greyDark,
  fontSize: '1.1rem',
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  opacity: 0.8,
}));

const BadgeContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const BadgeTitle = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e40af 0%, #f59e0b 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontWeight: 700,
  fontSize: '1.3rem',
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const BadgeItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '16px',
  marginBottom: theme.spacing(1.5),
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateX(10px) scale(1.02)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 100%)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
    transition: 'all 0.6s ease',
  },
  '&:hover::before': {
    left: '100%',
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  fontWeight: 600,
  fontSize: '0.9rem',
  padding: theme.spacing(0.5, 1),
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  border: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
  },
}));

const BadgeDescription = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: colors.greyText,
  fontWeight: 500,
  fontSize: '1rem',
}));

const EditButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  color: colors.blue,
  borderRadius: '12px',
  padding: theme.spacing(1, 2),
  fontSize: '0.9rem',
  fontWeight: 600,
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 1)',
    transform: 'scale(1.05)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  },
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
              <EditButton startIcon={<EditIcon />}>
                Modifier
              </EditButton>
              <ProfileAvatar>{getUserInitials(user?.name || 'U')}</ProfileAvatar>
              <CardContent sx={{ pt: 8 }}>
                <UserName variant="h4">
                  {user?.name || 'Utilisateur'}
                  <VerifiedIcon sx={{ color: '#1DA1F2', fontSize: '1.5rem' }} />
                </UserName>
                <UserTitle>
                  {user?.title || 'Titre du profil'}
                </UserTitle>
                
                <Divider sx={{ 
                  background: 'linear-gradient(90deg, transparent, rgba(30, 64, 175, 0.3), rgba(245, 158, 11, 0.3), transparent)',
                  height: '2px',
                  border: 'none',
                  margin: '20px 0'
                }} />
                
                <BadgeContainer>
                  <BadgeTitle>
                    <StarIcon sx={{ color: '#FFD700' }} />
                    Badges de Réussite
                  </BadgeTitle>
                  <List sx={{ p: 0 }}>
                    {BADGE_DEFINITIONS.map((badge, index) => (
                      <BadgeItem key={badge.id} sx={{
                        animationDelay: `${index * 0.1}s`,
                        animation: `${float} 3s ease-in-out infinite`,
                      }}>
                        <StyledChip label={badge.label} />
                        <BadgeDescription>{badge.description}</BadgeDescription>
                      </BadgeItem>
                    ))}
                  </List>
                </BadgeContainer>
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
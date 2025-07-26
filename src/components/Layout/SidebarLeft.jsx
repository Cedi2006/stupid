import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  styled,
} from '@mui/material';
import {
  Person as PersonIcon,
  Bookmark as BookmarkIcon,
  Group as GroupIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { useAuth } from '../../Context/AuthContext.jsx';
import { colors } from '../../components/styles/theme.js';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '270px',
  position: 'sticky',
  top: '70px', // Height of header + some margin
  height: 'calc(100vh - 80px)',
  overflowY: 'auto',
  paddingRight: theme.spacing(2),
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: colors.white,
  border: `1px solid ${colors.greyMedium}`,
  borderRadius: theme.spacing(1),
  overflow: 'visible',
  position: 'relative',
}));

const CoverBox = styled(Box)(({ theme }) => ({
  height: '54px',
  background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.yellow} 100%)`,
  borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 72,
  height: 72,
  position: 'absolute',
  top: '18px',
  left: '50%',
  transform: 'translateX(-50%)',
  border: `3px solid ${colors.white}`,
  backgroundColor: colors.blue,
  color: colors.white,
  fontSize: '1.5rem',
  fontWeight: 600,
}));

const ProfileInfo = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const UnemploymentCounter = styled(Box)(({ theme }) => ({
  backgroundColor: colors.yellow,
  color: colors.greyText,
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(0.5),
  textAlign: 'center',
  margin: theme.spacing(1, 2, 2, 2),
}));

const StatsBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2, 2, 2),
}));

const StatItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(0.5),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const QuickLinksCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: colors.white,
  border: `1px solid ${colors.greyMedium}`,
  borderRadius: theme.spacing(1),
}));

const QuickLink = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  cursor: 'pointer',
  borderRadius: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: colors.greyLight,
  },
}));

function SidebarLeft() {
  const { user } = useAuth();

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const calculateDaysSinceEmployment = () => {
    // This is a fake calculation for the demo
    const today = new Date();
    const lastEmploymentDate = new Date(2022, 0, 15); // January 15, 2022
    const diffTime = Math.abs(today - lastEmploymentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!user) return null;

  return (
    <SidebarContainer>
      {/* Profile Card */}
      <ProfileCard>
        <CoverBox />
        <ProfileAvatar>{getUserInitials(user.name)}</ProfileAvatar>
        <ProfileInfo>
          <Typography variant="h6" fontWeight={600} sx={{ color: colors.greyText }}>
            {user.name}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.greyDark, mt: 0.5 }}>
            {user.title}
          </Typography>
        </ProfileInfo>
        <Divider />
        <UnemploymentCounter>
          <Typography variant="h6" fontWeight={700} sx={{ color: colors.greyText }}>
            {calculateDaysSinceEmployment()}
          </Typography>
          <Typography variant="caption" sx={{ color: colors.greyText }}>
            jours sans emploi
          </Typography>
        </UnemploymentCounter>
        <Divider />
        <StatsBox>
          <StatItem>
            <Typography variant="body2" sx={{ color: colors.greyDark }}>
              Vues du profil
            </Typography>
            <Typography variant="body2" fontWeight={600} sx={{ color: colors.greyText }}>
              152
            </Typography>
          </StatItem>
          <StatItem>
            <Typography variant="body2" sx={{ color: colors.greyDark }}>
              Connexions
            </Typography>
            <Typography variant="body2" fontWeight={600} sx={{ color: colors.greyText }}>
              {user.connections.length}
            </Typography>
          </StatItem>
        </StatsBox>
      </ProfileCard>

      {/* Quick Links */}
      <QuickLinksCard>
        <List disablePadding>
          <QuickLink>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <PersonIcon sx={{ color: colors.blue }} />
            </ListItemIcon>
            <ListItemText 
              primary="Mon profil" 
              primaryTypographyProps={{ 
                variant: 'body2',
                fontWeight: 500,
                color: colors.greyText,
              }}
            />
          </QuickLink>
          <QuickLink>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <GroupIcon sx={{ color: colors.blue }} />
            </ListItemIcon>
            <ListItemText 
              primary="Mes connexions" 
              primaryTypographyProps={{ 
                variant: 'body2',
                fontWeight: 500,
                color: colors.greyText,
              }}
            />
            <Chip 
              label="8" 
              size="small" 
              sx={{ 
                bgcolor: colors.blue, 
                color: colors.white,
                height: 20,
                fontSize: '0.7rem',
              }} 
            />
          </QuickLink>
          <QuickLink>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <BookmarkIcon sx={{ color: colors.blue }} />
            </ListItemIcon>
            <ListItemText 
              primary="Emplois sauvegardés" 
              primaryTypographyProps={{ 
                variant: 'body2',
                fontWeight: 500,
                color: colors.greyText,
              }}
            />
            <Chip 
              label="3" 
              size="small" 
              sx={{ 
                bgcolor: colors.blue, 
                color: colors.white,
                height: 20,
                fontSize: '0.7rem',
              }} 
            />
          </QuickLink>
          <QuickLink>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <EventIcon sx={{ color: colors.blue }} />
            </ListItemIcon>
            <ListItemText 
              primary="Événements" 
              primaryTypographyProps={{ 
                variant: 'body2',
                fontWeight: 500,
                color: colors.greyText,
              }}
            />
          </QuickLink>
        </List>
      </QuickLinksCard>

      {/* Badges */}
      <QuickLinksCard>
        <CardContent>
          <Typography variant="subtitle2" fontWeight={600} color={colors.blue} gutterBottom>
            Badges de fainéantise
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
            <Chip 
              label="Expert Netflix" 
              size="small" 
              sx={{ 
                bgcolor: colors.yellow, 
                color: colors.greyText,
                fontWeight: 500,
              }} 
            />
            <Chip 
              label="Maître du Canapé" 
              size="small" 
              sx={{ 
                bgcolor: colors.yellow, 
                color: colors.greyText,
                fontWeight: 500,
              }} 
            />
            <Chip 
              label="Roi de la Sieste" 
              size="small" 
              sx={{ 
                bgcolor: colors.yellow, 
                color: colors.greyText,
                fontWeight: 500,
              }} 
            />
            <Chip 
              label="Procrastinateur Pro" 
              size="small" 
              sx={{ 
                bgcolor: colors.yellow, 
                color: colors.greyText,
                fontWeight: 500,
              }} 
            />
          </Box>
        </CardContent>
      </QuickLinksCard>
    </SidebarContainer>
  );
}

export default SidebarLeft;

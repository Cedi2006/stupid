import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  styled,
  Avatar,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { colors } from '../../styles/theme.js';
import { SAMPLE_JOBS } from '../../data/mockData';

const SidebarContainer = styled(Box)(({ theme }) => ({
  width: '320px',
  position: 'sticky',
  top: '70px', // Height of header + some margin
  height: 'calc(100vh - 80px)',
  overflowY: 'auto',
  paddingLeft: theme.spacing(2),
  [theme.breakpoints.down('xl')]: {
    display: 'none',
  },
}));

const SidebarCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: colors.white,
  border: `1px solid ${colors.greyMedium}`,
  borderRadius: theme.spacing(1),
}));

const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 2, 1, 2),
}));

const JobItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  alignItems: 'flex-start',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: colors.greyLight,
  },
}));

const AdCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: colors.white,
  border: `1px solid ${colors.greyMedium}`,
  borderRadius: theme.spacing(1),
  position: 'relative',
}));

const AdBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  fontSize: '0.625rem',
  height: '20px',
  backgroundColor: colors.greyLight,
  color: colors.greyDark,
}));

const TrendingCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: colors.white,
  border: `1px solid ${colors.greyMedium}`,
  borderRadius: theme.spacing(1),
}));

function SidebarRight() {
  // Get featured jobs (first 3)
  const featuredJobs = SAMPLE_JOBS.slice(0, 3);

  // Trending topics related to unemployment humor
  const trendingTopics = [
    { topic: 'Procrastination professionnelle', posts: '1,234 posts' },
    { topic: 'Netflix Expert', posts: '987 posts' },
    { topic: 'Art de la sieste', posts: '765 posts' },
    { topic: 'Chômage créatif', posts: '543 posts' },
    { topic: 'Optimisation du temps libre', posts: '432 posts' },
  ];

  // Suggested connections
  const suggestedConnections = [
    {
      id: 'connect1',
      name: 'Paul Glandeur',
      title: 'Feignasse Senior chez McDonalds',
      mutual: 12,
    },
    {
      id: 'connect2',
      name: 'Emma Nonchalant',
      title: 'Spécialiste en Repos chez Aucun Travail Inc.',
      mutual: 5,
    },
  ];

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <SidebarContainer>
      {/* Featured Jobs */}
      <SidebarCard>
        <CardHeader>
          <Typography variant="subtitle1" fontWeight={600} color={colors.blue}>
            Emplois pour vous
          </Typography>
          <Typography
            variant="body2"
            color={colors.blue}
            sx={{ cursor: 'pointer', fontWeight: 500 }}
          >
            Voir plus
          </Typography>
        </CardHeader>
        <Divider />
        <List disablePadding>
          {featuredJobs.map((job) => (
            <JobItem key={job.id}>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight={600} color={colors.greyText}>
                    {job.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="caption" color={colors.greyDark} display="block">
                      {job.company}
                    </Typography>
                    <Typography variant="caption" color={colors.greyDark} display="block">
                      {job.location}
                    </Typography>
                    <Box sx={{ mt: 0.5 }}>
                      {job.tags.slice(0, 2).map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            mr: 0.5,
                            fontSize: '0.625rem',
                            height: '20px',
                            backgroundColor: colors.greyLight,
                            color: colors.greyDark,
                          }}
                        />
                      ))}
                    </Box>
                  </>
                }
              />
            </JobItem>
          ))}
        </List>
      </SidebarCard>

      {/* Trending Topics */}
      <TrendingCard>
        <CardHeader>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TrendingUpIcon sx={{ color: colors.blue, mr: 1 }} />
            <Typography variant="subtitle1" fontWeight={600} color={colors.blue}>
              Tendances
            </Typography>
          </Box>
        </CardHeader>
        <Divider />
        <List disablePadding>
          {trendingTopics.map((item, index) => (
            <ListItem key={index} sx={{ py: 1, px: 2 }}>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight={600} color={colors.greyText}>
                    {item.topic}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" color={colors.greyDark}>
                    {item.posts}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </TrendingCard>

      {/* Advertisement */}
      <AdCard>
        <AdBadge label="Publicité" />
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Rejoignez l'Académie des Glandeurs Professionnels
          </Typography>
          <Typography variant="body2" color={colors.greyDark} gutterBottom>
            Apprenez l'art de ne rien faire tout en prétendant être productif. Formation certifiante.
          </Typography>
          <Button
            variant="outlined"
            size="small"
            sx={{
              mt: 1,
              borderColor: colors.blue,
              color: colors.blue,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            En savoir plus
          </Button>
        </CardContent>
      </AdCard>

      {/* Suggested Connections */}
      <SidebarCard>
        <CardHeader>
          <Typography variant="subtitle1" fontWeight={600} color={colors.blue}>
            Suggestions de connexions
          </Typography>
        </CardHeader>
        <Divider />
        <List disablePadding>
          {suggestedConnections.map((person) => (
            <ListItem key={person.id} sx={{ py: 1.5, px: 2 }}>
              <Avatar sx={{ mr: 1.5, bgcolor: colors.blue }}>{getUserInitials(person.name)}</Avatar>
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight={600} color={colors.greyText}>
                    {person.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="caption" color={colors.greyDark} display="block">
                      {person.title}
                    </Typography>
                    <Typography variant="caption" color={colors.greyDark}>
                      {person.mutual} relations en commun
                    </Typography>
                  </>
                }
              />
              <Button
                size="small"
                variant="contained"
                sx={{
                  minWidth: 'auto',
                  bgcolor: colors.blue,
                  borderRadius: 3,
                  fontSize: '0.75rem',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 1.5,
                  '&:hover': {
                    bgcolor: '#1E3A6F',
                  },
                }}
              >
                Connecter
              </Button>
            </ListItem>
          ))}
        </List>
      </SidebarCard>

      {/* Helpful Links */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2, px: 1 }}>
        <Typography variant="caption" color={colors.greyDark} sx={{ cursor: 'pointer' }}>
          À propos
        </Typography>
        <Typography variant="caption" color={colors.greyDark} sx={{ cursor: 'pointer' }}>
          Aide
        </Typography>
        <Typography variant="caption" color={colors.greyDark} sx={{ cursor: 'pointer' }}>
          Confidentialité
        </Typography>
        <Typography variant="caption" color={colors.greyDark} sx={{ cursor: 'pointer' }}>
          Conditions
        </Typography>
      </Box>
      <Typography variant="caption" color={colors.greyDark} sx={{ px: 1 }}>
        LinkedOut © 2023 | La plateforme des chercheurs de rien
      </Typography>
    </SidebarContainer>
  );
}

export default SidebarRight;

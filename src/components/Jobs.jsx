import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Divider,
  styled,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import Header from '../components/Layout/Header.jsx';
import SidebarLeft from '../components/Layout/SidebarLeft.jsx';
import SidebarRight from '../components/Layout/SidebarRight.jsx';
import { colors } from '../components/styles/theme.js';
import { SAMPLE_JOBS } from '../data/mockData.js';

const JobsContainer = styled(Container)(({ theme }) => ({
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

const SearchCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  backgroundColor: colors.white,
  border: `1px solid ${colors.greyMedium}`,
  borderRadius: theme.spacing(1),
}));

const JobCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: colors.white,
  border: `1px solid ${colors.greyMedium}`,
  borderRadius: theme.spacing(1),
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
    transform: 'translateY(-1px)',
  },
}));

const JobHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
}));

const JobDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  color: colors.greyDark,
  fontSize: '0.875rem',
}));

const JobDetailItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const ApplyButton = styled(Button)(({ theme }) => ({
  backgroundColor: colors.blue,
  color: colors.white,
  borderRadius: theme.spacing(3),
  textTransform: 'none',
  fontWeight: 600,
  padding: theme.spacing(1, 3),
  '&:hover': {
    backgroundColor: '#1E3A6F',
  },
}));

function Jobs() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState(SAMPLE_JOBS);

  // ...existing logic from Jobs.tsx, sans types...

  return (
    <>
      <Header />
      <JobsContainer>
        <MainLayout>
          <SidebarLeft />
          <MainContent>
            <SearchCard>
              <CardContent>
                <Typography variant="h5" fontWeight={700} mb={2} color={colors.blue}>
                  Rechercher un job
                </Typography>
                <Box display="flex" gap={2} mb={2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Titre du poste, mots-clés..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Lieu"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Divider />
              </CardContent>
            </SearchCard>
            {jobs.map(job => (
              <JobCard key={job.id}>
                <CardContent>
                  <JobHeader>
                    <Box>
                      <Typography variant="h6" fontWeight={700} color={colors.blue}>
                        {job.title}
                      </Typography>
                      <Typography variant="body2" color={colors.greyDark}>
                        {job.company}
                      </Typography>
                    </Box>
                    <ApplyButton>Postuler</ApplyButton>
                  </JobHeader>
                  <JobDetails>
                    <JobDetailItem>
                      <LocationIcon fontSize="small" />
                      {job.location}
                    </JobDetailItem>
                    <JobDetailItem>
                      <MoneyIcon fontSize="small" />
                      {job.salary}
                    </JobDetailItem>
                    <JobDetailItem>
                      <PeopleIcon fontSize="small" />
                      {job.applicants} candidats
                    </JobDetailItem>
                  </JobDetails>
                  <Box display="flex" gap={1} flexWrap="wrap">
                    {job.tags.map(tag => (
                      <Chip key={tag} label={tag} color="primary" size="small" />
                    ))}
                  </Box>
                </CardContent>
              </JobCard>
            ))}
          </MainContent>
          <SidebarRight />
        </MainLayout>
      </JobsContainer>
    </>
  );
}

export default Jobs;

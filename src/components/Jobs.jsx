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
  keyframes,
  Avatar,
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  AttachMoney as MoneyIcon,
  People as PeopleIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import Header from '../components/Layout/Header.jsx';
import SidebarLeft from '../components/Layout/SidebarLeft.jsx';
import SidebarRight from '../components/Layout/SidebarRight.jsx';
import { colors } from '../components/styles/theme.js';
import { SAMPLE_JOBS } from '../data/mockData.js';

// Animation keyframes
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Color palette
const PRIMARY_YELLOW = '#FCDC4B';
const PRIMARY_BLUE = '#2F4F93';

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
  background: `linear-gradient(135deg, ${PRIMARY_BLUE} 0%, rgba(47, 79, 147, 0.9) 100%)`,
  backdropFilter: 'blur(20px)',
  border: 'none',
  borderRadius: '24px',
  boxShadow: '0 20px 40px rgba(47, 79, 147, 0.3)',
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(45deg, transparent 30%, rgba(252, 220, 75, 0.1) 50%, transparent 70%)`,
    backgroundSize: '200px 100%',
    animation: `${shimmer} 3s infinite`,
  },
}));

const SearchTitle = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${PRIMARY_YELLOW} 0%, #fff 100%)`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontWeight: 800,
  fontSize: '1.8rem',
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: 'none',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      boxShadow: `0 0 0 3px rgba(252, 220, 75, 0.3)`,
      transform: 'translateY(-2px)',
    },
    '& fieldset': {
      border: 'none',
    },
  },
  '& .MuiInputAdornment-root': {
    color: PRIMARY_BLUE,
  },
}));

const JobCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: `1px solid rgba(252, 220, 75, 0.2)`,
  borderRadius: '20px',
  cursor: 'pointer',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  animation: `${slideUp} 0.6s ease-out`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${PRIMARY_BLUE} 0%, ${PRIMARY_YELLOW} 100%)`,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `0 25px 50px rgba(47, 79, 147, 0.2)`,
    background: 'rgba(255, 255, 255, 1)',
    borderColor: PRIMARY_YELLOW,
    '&::before': {
      transform: 'scaleX(1)',
    },
  },
}));

const JobHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  position: 'relative',
}));

const CompanyLogo = styled(Avatar)(({ theme }) => ({
  width: 50,
  height: 50,
  background: `linear-gradient(135deg, ${PRIMARY_BLUE} 0%, ${PRIMARY_YELLOW} 100%)`,
  color: 'white',
  fontWeight: 700,
  fontSize: '1.2rem',
  marginRight: theme.spacing(2),
  boxShadow: '0 8px 20px rgba(47, 79, 147, 0.3)',
}));

const JobTitle = styled(Typography)(({ theme }) => ({
  color: PRIMARY_BLUE,
  fontWeight: 800,
  fontSize: '1.3rem',
  marginBottom: theme.spacing(0.5),
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(135deg, ${PRIMARY_BLUE} 0%, ${PRIMARY_YELLOW} 100%)`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
}));

const CompanyName = styled(Typography)(({ theme }) => ({
  color: '#666',
  fontWeight: 600,
  fontSize: '1rem',
}));

const JobDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2.5),
  marginBottom: theme.spacing(2),
  color: '#555',
  fontSize: '0.95rem',
}));

const JobDetailItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.8),
  padding: theme.spacing(0.5, 1.2),
  backgroundColor: 'rgba(47, 79, 147, 0.08)',
  borderRadius: '12px',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: `rgba(252, 220, 75, 0.2)`,
    transform: 'translateY(-2px)',
  },
  '& .MuiSvgIcon-root': {
    color: PRIMARY_BLUE,
    fontSize: '1.1rem',
  },
}));

const ApplyButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${PRIMARY_YELLOW} 0%, #f5d400 100%)`,
  color: PRIMARY_BLUE,
  borderRadius: '16px',
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '0.95rem',
  padding: theme.spacing(1.2, 2.5),
  boxShadow: '0 8px 20px rgba(252, 220, 75, 0.4)',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)`,
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    background: `linear-gradient(135deg, #f5d400 0%, ${PRIMARY_YELLOW} 100%)`,
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 12px 30px rgba(252, 220, 75, 0.6)',
    '&::before': {
      left: '100%',
    },
  },
}));

const SaveButton = styled(Button)(({ theme }) => ({
  minWidth: '48px',
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: 'rgba(47, 79, 147, 0.1)',
  color: PRIMARY_BLUE,
  marginLeft: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: PRIMARY_BLUE,
    color: 'white',
    transform: 'scale(1.1)',
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  background: `linear-gradient(135deg, rgba(47, 79, 147, 0.1) 0%, rgba(252, 220, 75, 0.1) 100%)`,
  color: PRIMARY_BLUE,
  fontWeight: 600,
  fontSize: '0.85rem',
  borderRadius: '12px',
  border: `1px solid rgba(47, 79, 147, 0.2)`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `linear-gradient(135deg, ${PRIMARY_BLUE} 0%, ${PRIMARY_YELLOW} 100%)`,
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(47, 79, 147, 0.3)',
  },
}));

const JobMeta = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2),
  paddingTop: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
}));

const TimePosted = styled(Typography)(({ theme }) => ({
  color: '#888',
  fontSize: '0.85rem',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const TrendingBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.3, 0.8),
  backgroundColor: `rgba(252, 220, 75, 0.2)`,
  color: PRIMARY_BLUE,
  borderRadius: '8px',
  fontSize: '0.8rem',
  fontWeight: 600,
  animation: `${pulse} 2s infinite`,
}));

function Jobs() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobs, setJobs] = useState(SAMPLE_JOBS);
  const [savedJobs, setSavedJobs] = useState(new Set());

  const toggleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const getCompanyInitials = (company) => {
    return company
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <>
      <Header />
      <JobsContainer>
        <MainLayout>
          <SidebarLeft />
          <MainContent>
            <SearchCard>
              <CardContent sx={{ position: 'relative', zIndex: 1 }}>
                <SearchTitle>
                  <SearchIcon sx={{ color: PRIMARY_YELLOW, fontSize: '2rem' }} />
                  Trouvez votre job de rêve
                </SearchTitle>
                <Box display="flex" gap={2} mb={2}>
                  <StyledTextField
                    fullWidth
                    variant="outlined"
                    placeholder="Titre du poste, mots-clés, entreprise..."
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
                  <StyledTextField
                    fullWidth
                    variant="outlined"
                    placeholder="Ville, région, pays..."
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
              </CardContent>
            </SearchCard>

            {jobs.map((job, index) => (
              <JobCard 
                key={job.id} 
                sx={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent>
                  <JobHeader>
                    <Box display="flex" alignItems="flex-start">
                      <CompanyLogo>
                        {getCompanyInitials(job.company)}
                      </CompanyLogo>
                      <Box>
                        <JobTitle>
                          {job.title}
                        </JobTitle>
                        <CompanyName>
                          {job.company}
                        </CompanyName>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <ApplyButton>
                        Postuler maintenant
                      </ApplyButton>
                      <SaveButton
                        onClick={() => toggleSaveJob(job.id)}
                      >
                        {savedJobs.has(job.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                      </SaveButton>
                    </Box>
                  </JobHeader>

                  <JobDetails>
                    <JobDetailItem>
                      <LocationIcon />
                      {job.location}
                    </JobDetailItem>
                    <JobDetailItem>
                      <MoneyIcon />
                      {job.salary}
                    </JobDetailItem>
                    <JobDetailItem>
                      <PeopleIcon />
                      {job.applicants} candidats
                    </JobDetailItem>
                  </JobDetails>

                  <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                    {job.tags.map(tag => (
                      <StyledChip key={tag} label={tag} size="small" />
                    ))}
                  </Box>

                  <JobMeta>
                    <TimePosted>
                      <ScheduleIcon fontSize="small" />
                      Publié il y a 2 jours
                    </TimePosted>
                    {index < 3 && (
                      <TrendingBadge>
                        <TrendingUpIcon fontSize="small" />
                        Tendance
                      </TrendingBadge>
                    )}
                  </JobMeta>
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
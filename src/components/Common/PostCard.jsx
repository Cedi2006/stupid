import React, { useState } from 'react';
import {
  Card,
  CardActions,
  Box,
  Avatar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  TextField,
  Collapse,
  styled,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  ThumbUp as ThumbUpIcon,
  ThumbUpOutlined as ThumbUpOutlinedIcon,
  ChatBubbleOutline as CommentIcon,
  Share as ShareIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { colors } from '../styles/theme.js';
import { SAMPLE_USERS } from '../../data/mockData.js';
import { useAuth } from '../../Context/AuthContext.jsx';

const PostCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: colors.white,
  border: `1px solid ${colors.greyMedium}`,
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
}));

const PostHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(2, 2, 1, 2),
}));

const AuthorInfo = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(1.5),
  flex: 1,
}));

const PostContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2, 1, 2),
}));

const PostText = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  lineHeight: 1.5,
  color: colors.greyText,
  whiteSpace: 'pre-line',
  wordBreak: 'break-word',
}));

const PostActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(0.5, 1),
  borderTop: `1px solid ${colors.greyMedium}`,
  justifyContent: 'space-around',
}));

const ActionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  flex: 1,
  color: active ? colors.blue : colors.greyDark,
  backgroundColor: active ? `${colors.blue}08` : 'transparent',
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: 500,
  padding: theme.spacing(1),
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: active ? `${colors.blue}12` : colors.greyLight,
  },
}));

const CommentSection = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${colors.greyMedium}`,
  padding: theme.spacing(1, 2),
}));

const CommentInput = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
}));

const TimeDisplay = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: colors.greyDark,
}));

function PostCardComponent({ post, onLike, onComment, onShare }) {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLike = () => {
    if (onLike) onLike(post.id);
  };

  const handleComment = () => {
    if (commentText.trim() && onComment) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  const handleShare = () => {
    if (onShare) onShare(post.id);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleComment();
    }
  };

  const getPostAuthor = () => {
    return SAMPLE_USERS.find(u => u.id === post.userId) || { name: 'Utilisateur', title: 'Membre' };
  };

  const author = getPostAuthor();

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return `il y a ${diffInSeconds} secondes`;
    } else if (diffInSeconds < 3600) {
      return `il y a ${Math.floor(diffInSeconds / 60)} minutes`;
    } else if (diffInSeconds < 86400) {
      return `il y a ${Math.floor(diffInSeconds / 3600)} heures`;
    } else if (diffInSeconds < 604800) {
      return `il y a ${Math.floor(diffInSeconds / 86400)} jours`;
    } else {
      return date.toLocaleDateString('fr-FR');
    }
  };

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const isLiked = user && post.likedBy.includes(user.id);

  return (
    <PostCard>
      <PostHeader>
        <Avatar
          sx={{
            backgroundColor: colors.blue,
            color: colors.white,
          }}
        >
          {getUserInitials(author.name)}
        </Avatar>
        <AuthorInfo>
          <Typography variant="subtitle1" fontWeight={600} sx={{ color: colors.greyText }}>
            {author.name}
          </Typography>
          <Typography variant="caption" sx={{ color: colors.greyDark }}>
            {author.title} • {formatTimestamp(post.timestamp)}
          </Typography>
        </AuthorInfo>
        <IconButton onClick={handleMenuOpen} size="small">
          <MoreVertIcon fontSize="small" />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Masquer ce post</MenuItem>
          <MenuItem onClick={handleMenuClose}>Signaler</MenuItem>
        </Menu>
      </PostHeader>
      <PostContent>
        <PostText variant="body1">
          {post.content}
        </PostText>
      </PostContent>
      <Box px={2} pb={1} display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={0.5}>
          {post.likes > 0 && (
            <>
              <ThumbUpIcon fontSize="small" sx={{ color: colors.blue, width: 16, height: 16 }} />
              <Typography variant="caption" sx={{ color: colors.greyDark }}>
                {post.likes}
              </Typography>
            </>
          )}
        </Box>
        {post.comments > 0 && (
          <Typography variant="caption" sx={{ color: colors.greyDark, cursor: 'pointer' }} onClick={toggleComments}>
            {post.comments} commentaires
          </Typography>
        )}
      </Box>
      <PostActions>
        <ActionButton 
          startIcon={isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          onClick={handleLike}
          active={isLiked}
        >
          J'aime
        </ActionButton>
        <ActionButton 
          startIcon={<CommentIcon />}
          onClick={toggleComments}
        >
          Commenter
        </ActionButton>
        <ActionButton 
          startIcon={<ShareIcon />}
          onClick={handleShare}
        >
          Partager
        </ActionButton>
      </PostActions>
      <Collapse in={showComments}>
        <CommentSection>
          <CommentInput>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                fontSize: '0.75rem',
                backgroundColor: colors.blue,
                color: colors.white,
              }}
            >
              {user ? getUserInitials(user.name) : 'U'}
            </Avatar>
            <TextField
              fullWidth
              multiline
              rows={1}
              placeholder="Écrivez un commentaire..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <IconButton 
                    size="small" 
                    onClick={handleComment}
                    disabled={!commentText.trim()}
                  >
                    <SendIcon fontSize="small" />
                  </IconButton>
                ),
                sx: {
                  borderRadius: 3,
                  backgroundColor: colors.greyLight,
                  px: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                }
              }}
              variant="outlined"
            />
          </CommentInput>
        </CommentSection>
      </Collapse>
    </PostCard>
  );
}

export default PostCardComponent;

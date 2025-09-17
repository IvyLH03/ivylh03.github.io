import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';

const PreviewPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  cursor: 'pointer',
  transition: 'box-shadow 0.2s',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
}));

function getPreview(content, maxLength = 200) {
  console.log(content);
  if (content.length <= maxLength) {
    return content;
  }
  return content.slice(0, maxLength) + '...';
}

const BlogPreviewCard = ({ title, timestamp, content, onClick }) => (
  <PreviewPaper elevation={3} onClick={onClick}>
    <Typography variant="h5" component="h2" gutterBottom>
      {title}
    </Typography>
    <Typography variant="caption" color="text.secondary" gutterBottom>
      {new Date(timestamp).toLocaleString()}
    </Typography>
    <Box mt={2}>
      <ReactMarkdown>
        {getPreview(content)}
      </ReactMarkdown>
    </Box>
  </PreviewPaper>
);

BlogPreviewCard.propTypes = {
  title: PropTypes.string.isRequired,
  postTime: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default BlogPreviewCard;
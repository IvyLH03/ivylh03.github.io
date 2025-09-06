import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * NoteCard component displays a note's content, timestamp, and labels as hashtags.
 * @param {Object} props
 * @param {string} props.content - The content of the note.
 * @param {number} props.id - The note's unique identifier.
 * @param {string} props.timestamp - The post time of the note.
 * @param {string[]} props.labels - List of hashtag labels.
 */
const NoteCard = ({ content, id, timestamp, labels, onDelete }) => {
  const adminMode = localStorage.getItem("upload_password") !== null;
  return (
    <Card sx={{ minWidth: 275, mb: 2, position: 'relative' }} variant="outlined">
      {adminMode && (
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => onDelete && onDelete(id)}
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {content}
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          Posted: {new Date(timestamp).toLocaleString()}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
          {labels && labels.map((label, idx) => (
            <Chip
              key={idx}
              label={`#${label}`}
              size="small"
              sx={{ mb: 0.5 }}
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NoteCard;

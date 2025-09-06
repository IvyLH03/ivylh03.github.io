import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

/**
 * NoteEditor component for creating or editing a note.
 * @param {Object} props
 * @param {function} props.onSubmit - Called with { content, labels } on submit
 * @param {string} [props.initialContent] - Initial content value
 * @param {string[]} [props.initialLabels] - Initial labels value
 */
const NoteEditor = ({ onSubmit, initialContent = '', initialLabels = [] }) => {
  const [content, setContent] = useState(initialContent);
  const [labelInput, setLabelInput] = useState('');
  const [labels, setLabels] = useState(initialLabels);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleAddLabel = () => {
    const trimmed = labelInput.trim();
    if (trimmed && !labels.includes(trimmed)) {
      setLabels([...labels, trimmed]);
    }
    setLabelInput('');
  };

  const handleDeleteLabel = (labelToDelete) => {
    setLabels(labels.filter(label => label !== labelToDelete));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLabel();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit && onSubmit({ content: content.trim(), labels, isPrivate });
      setContent('');
      setLabels([]);
      setIsPrivate(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        label="Note Content"
        multiline
        fullWidth
        minRows={3}
        value={content}
        onChange={e => setContent(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2, flexWrap: 'wrap' }}>
        <TextField
          label="Add label"
          value={labelInput}
          onChange={e => setLabelInput(e.target.value)}
          onKeyDown={handleKeyDown}
          size="small"
          sx={{ width: 150 }}
        />
        <Button variant="contained" onClick={handleAddLabel} size="small">Add</Button>
        {labels.map(label => (
          <Chip
            key={label}
            label={`#${label}`}
            onDelete={() => handleDeleteLabel(label)}
            color="primary"
            size="small"
            sx={{ ml: 0.5, mb: 0.5 }}
          />
        ))}
      </Stack>
      <FormControlLabel
        control={
          <Checkbox
            checked={isPrivate}
            onChange={e => setIsPrivate(e.target.checked)}
            color="primary"
          />
        }
        label="Private"
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="success">Save Note</Button>
    </Box>
  );
};

export default NoteEditor;

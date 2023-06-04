import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function IconButtons({ onClick }) {
  return (
      <IconButton color="primary" aria-label="refresh page" onClick={onClick}>
        <RefreshIcon />
      </IconButton>
   
  );
}
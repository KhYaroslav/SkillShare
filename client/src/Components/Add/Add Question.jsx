import {
  Fab,
  Tooltip,
} from '@mui/material';
import React from 'react';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AddQuestion = () => {
  const navigate = useNavigate();
  return (
    <>
      <Tooltip
        onClick={() => navigate('/addquestion')}
        title="Добавить вопрос"
        sx={{
          position: 'fixed',
          bottom: 20,
          left: { xs: 'calc(50% - 25px)', md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
    </>
  );
};

export default AddQuestion;

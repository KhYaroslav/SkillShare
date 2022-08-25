import {
  Fab,
  Tooltip,
} from '@mui/material';
import React from 'react';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useNavigate } from 'react-router-dom';

const AddQuestions = () => {
  const navigate = useNavigate();
  return (
    <>
      <Tooltip
        onClick={() => navigate('/newquestion')}
        title="Добавть вопрос"
        sx={{
          position: 'fixed',
          bottom: 100,
          backgroundColor: '#ffc107',
          left: { xs: 'calc(50% - 25px)', md: 30 },
        }}
      >
        <Fab color="yellow" aria-label="add">
          <QuestionMarkIcon />
        </Fab>
      </Tooltip>
    </>
  );
};

export default AddQuestions;

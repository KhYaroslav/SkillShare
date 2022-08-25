import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import Question from './Question';

export default function Questions() {
  const questions = useSelector((state) => state.questions);
  return (
    <>
      <div>Questions</div>
      <Box flex={4} p={{ xs: 0, md: 2 }}>
        {questions?.length && questions.map((el) => <Question key={el.id} question={el} />)}
      </Box>
    </>
  );
}

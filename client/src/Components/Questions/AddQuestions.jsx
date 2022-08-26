import {
  Button,
  FormControlLabel, TextareaAutosize, TextField, Typography
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion } from '../../Redux/actions/questionAction.js';
import { TiptapQuestion } from '../MyTextBar/TiptapQuestion';

export default function AddQuestions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({ title: '', description: '' });

  const changeHandler = (e) => {
    setQuestion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addQuestion(question));
    navigate('/question');
  };

  return (
    <Container>
      <div
        className="App"
        style={{
          position: 'relative',
          left: '25%',
        }}
      >
        <Typography variant="h5" sx={{ position: 'relative', left: '10%' }}>Добавить вопрос</Typography>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="12">
            <TextField
              sx={{ width: '300px', top: '75px' }}
              type="text"
              label="Title"
              variant="outlined"
              name="title"
              value={question?.title}
              onChange={changeHandler}
            />
            <div style={{ position: 'relative', width: '500px', top: '5px', right: '100px' }} className="App">
              <TiptapQuestion setQuestion={setQuestion} />
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              bottom: '70px'
            }}
          >
            Добавить
          </Button>
        </form>
      </div>
    </Container>
  );
}

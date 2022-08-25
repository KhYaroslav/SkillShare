import {
  Button,
  FormControlLabel, TextareaAutosize, TextField, Typography
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestion } from '../../Redux/actions/questionAction.js.js';
import { TiptapQuestion } from '../MyTextBar/TiptapQuestion';

export default function AddQuestions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({ title: '', description: '' });
  console.log('question----->', question);

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
        <Typography variant="h5">Добавить вопрос</Typography>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="12">
            <TextField
              style={{ width: '400px', margin: '5px' }}
              type="text"
              label="Title"
              variant="outlined"
              name="title"
              value={question?.title}
              onChange={changeHandler}
            />
            <div className="App">
              <TiptapQuestion setQuestion={setQuestion} />
            </div>
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              marginTop: '2%'
            }}
          >
            Добавить
          </Button>
        </form>
      </div>
    </Container>
  );
}

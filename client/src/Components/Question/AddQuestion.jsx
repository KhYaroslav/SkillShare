import {
  Button,
  FormControlLabel, TextareaAutosize, TextField, Typography
} from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Tiptap } from '../MyTextBar/Tiptap';
import { postAdd } from '../../Redux/actions/postActions';
import { addQuestion } from '../../Redux/actions/questionActions';

export default function AddQuestion() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState({ title: '', description: '' });
  const changeHandler = (e) => {
    setQuestion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addQuestion(question));
    navigate('/questions');
  };

  return (
    <Container>
      <div className="App">
        <Typography variant="h5">Добавить вопрос</Typography>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className="12">
            <TextField
              style={{ width: '400px', margin: '5px' }}
              type="text"
              label="Title"
              variant="outlined"
              name="title"
              value={question.title}
              onChange={changeHandler}
            />
            <div className="App">
              <Tiptap setQuestion={setQuestion} />
            </div>
            <Button type="submit" variant="contained" color="primary">
              save
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

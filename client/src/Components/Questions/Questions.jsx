import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addQuestions } from '../../Redux/actions/questionAction.js';
import Question from './Question/Question.jsx';
// import Question from './Question.jsx';

export default function Questions() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(addQuestions()); }, []);

  const questions = useSelector((state) => state.questions);
  return (
    <>
      <div>Questions</div>
      {questions?.map((el) => <Question question={el} />)}
    </>
  );
}

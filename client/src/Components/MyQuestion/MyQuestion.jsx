import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Question from '../Questions/Question/Question';

export default function MyQuestion() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => { dispatch({ type: 'JOIN_ROOM', payload: { id } }); }, []);
  return (
    <>
      <div>MyQuestion</div>
      <Question />
    </>
  );
}

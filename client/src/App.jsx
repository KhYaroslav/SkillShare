import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import Header from './Components/Header/Header';
import MyMirror from './Components/MyMirror/MyMirror';

export default function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<MyMirror />} />
          <Route path="/post" element={<h1>post</h1>} />
        </Routes>
      </Container>
    </>
  );
}

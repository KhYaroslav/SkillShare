import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import Header from './Components/Header/Header';

export default function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<h1>hello</h1>} />
          <Route path="/post" element={<h1>post</h1>} />
        </Routes>
      </Container>
    </>
  );
}

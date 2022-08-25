import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function NewTen() {
  const [newTen, setNewTen] = useState();
  useEffect(() => { axios('/api/new').then((res) => setNewTen(res.data)); }, []);

  return (
    <div>NewTen</div>

  );
}

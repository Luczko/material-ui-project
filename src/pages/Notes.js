import React, { useEffect, useState } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";

import NoteCard from "../components/NoteCard";

export default function Notes() {
  const [result, setResult] = useState([]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8000/notes/` + id);
    const newResult = result.filter((e) => e.id !== id);
    setResult(newResult);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/notes")
      .then((data) => setResult(data.data));
  }, []);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {result.map((e) => (
          <div item key={e.id}>
            <NoteCard note={e} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}

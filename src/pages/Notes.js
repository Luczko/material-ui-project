import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Notes() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/notes")
      .then((data) => setResult(data.data));
  }, []);
  return (
    <div>
      {result.map((e) => (
        <p key={e.id}>{e.title}</p>
      ))}
    </div>
  );
}

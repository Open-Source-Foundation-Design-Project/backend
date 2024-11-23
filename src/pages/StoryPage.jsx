import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav/Nav";
export default function SearchPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Nav />
    </div>
  );
}

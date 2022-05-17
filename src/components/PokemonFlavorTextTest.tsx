import React, { useState, useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useLocation, useNavigate } from "react-router-dom";

const PokemonFlavorTextTest = () => {
  const path = useLocation().pathname;
  const location = path.split("/")[1];
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const { displayFlavorText } = useActions();
  const { flavorTextLoading, flavorTextError, flavorText } = useTypedSelector(
    (state) => state.flavorText
  );

  useEffect(() => {
    displayFlavorText("rillaboom");
  }, []);

  if (flavorText) {
    console.log(flavorText);
  }

  return <div>{flavorText && <div>{flavorText.flavor_text}</div>}</div>;
};

export default PokemonFlavorTextTest;

import React, { useState } from "react";
import "../styles/css/pokedex.css";
import { useNavigate, useLocation } from "react-router-dom";

const Pokedex = () => {
  const [extend, setExtend] = useState("scale-100 h-56 md:h-96");
  const [outerBtn, setOuterBtn] = useState("h-32 md:h-56");
  const [innerBtn, setInnerBtn] = useState(
    "h-20 md:h-36 bg-cyan-200 hover:bg-cyan-300 hover:cursor-pointer"
  );
  const [firstInter, setFirst] = useState("h-12 md:h-20");
  const [secondInter, setSecond] = useState("h-12 md:h-20");

  const navigate = useNavigate();

  const path = useLocation().pathname;
  const location = path.split("/")[1];

  // FUNCTION TO CHANGE BACKGROUND WHEN CHANGING WEBSITE PAGE
  const changeBackground = () => {
    const body = document.querySelector("body");
    if (body) {
      body.className = "";
    }
  };

  changeBackground();

  const openPokedex = (): void => {
    setExtend("scale-150 h-56 md:h-96");
    setInnerBtn(
      "h-20 md:h-36 bg-cyan-100 hover:bg-cyan-100 hover:cursor-default"
    );
    setTimeout(() => {
      setExtend("scale-150 h-3/4 md:h-3/4");
      setOuterBtn("h-4/5 md:h-5/6");
      setInnerBtn(
        "h-[88%] md:h-[88%] bg-cyan-100 hover:bg-cyan-100 hover:cursor-default"
      );
      setFirst("h-[60%] md:h-3/5");
      setSecond("h-[60%] md:h-3/5");
    }, 200);
    setTimeout(() => {
      setExtend("scale-150 h-3/4 md:h-3/4 opacity-0");
    }, 600);
    setTimeout(() => {
      setExtend("scale-150 h-3/4 md:h-3/4 opacity-0 hidden");
      navigate("/list");
    }, 1200);
  };

  return (
    <div className="flex justify-center items-center fixed h-full w-full left-0 top-0">
      {/* POKEDEX BODY */}
      <div
        className={
          `pokedex-body rounded-xl flex justify-center items-center relative z-10 drop-shadow-2xl transition-all ease-linear duration-300 ` +
          extend
        }
      >
        {/* OUTER BUTTON */}
        <div
          className={
            `center-button bg-black border-2 md:border-4 border-white w-32 md:w-56 rounded-full flex justify-center items-center z-20 transition-all ease-linear duration-300 ` +
            outerBtn
          }
        >
          {/* INNER BUTTON */}
          <div
            className={
              `inner-button w-20 md:w-36 rounded-full border-8 border-cyan-100 z-30 transition-all ease-linear duration-300 ` +
              innerBtn
            }
            onClick={openPokedex}
          ></div>
          {/* INTERSECT LINE 1 */}
          <div
            className={
              `inner-intersect bg-cyan-100 md:w-52 w-[115px] absolute z-20 border-0 border-t-2 border-b-2 md:border-t-2 md:border-b-2 md:border-0 border-black transition-all ease-linear duration-300 ` +
              firstInter
            }
          ></div>
          {/* INTERSECT LINE 2 */}
          <div
            className={
              `intersect bg-cyan-100 w-full absolute z-10 border-2 md:border-4 border-white transition-all ease-linear duration-300 ` +
              secondInter
            }
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Pokedex;

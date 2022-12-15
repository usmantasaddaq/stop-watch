import React, { useEffect, useState } from "react";
import "./stopwatch.css";
import LogTable from "./logTable";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [buttonText, setButtonText] = useState("Start");
  const [data, setData] = useState([]);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const Time = {
    hrs: ("0" + Math.floor((time / 540000) % 60)).slice(-2),
    mins: ("0" + Math.floor((time / 60000) % 60)).slice(-2),
    sec: ("0" + Math.floor((time / 1000) % 100)).slice(-2),
    milis: ("0" + Math.floor((time / 100) % 100)).slice(-1),
    misc: ("0" + Math.floor((time / 10) % 100)).slice(-2),
  };

  const handlerClick = () => {
    if (buttonText === "Start") {
      setButtonText("Pause");
      setRunning(true);
    }

    if (buttonText === "Pause") {
      setButtonText("Start");
      setRunning(false);

      setData((dataitems) => {
        return [
          ...dataitems,
          {
            hrs: Time.hrs,
            mins: Time.mins,
            sec: Time.sec,
            milis: Time.milis,
            misc: Time.misc,
            value: "Pause",
          },
        ];
      });
    }
  };
  const handerSplit = () => {
    setData((dataitems) => {
      return [
        ...dataitems,
        {
          hrs: Time.hrs,
          mins: Time.mins,
          sec: Time.sec,
          milis: Time.milis,
          misc: Time.misc,
          value: "Split",
        },
      ];
    });
  };

  return (
    <>
      <div className="stopwatch">
        <div className="number">
          <span>
            {Time.hrs}:{Time.mins}:{Time.sec}.{Time.milis}
          </span>
          <span style={{ fontSize: "50px" }}>{Time.misc}</span>
        </div>
        <div className="numbers">
          <span>
            {Time.hrs}:{Time.mins}:{Time.sec}.{Time.milis}
            {Time.misc}
          </span>
        </div>
        <div>
          <button className="startButtons" onClick={handlerClick}>
            {buttonText}
          </button>
          <button
            className={buttonText === "Start" ? "splitbuttons" : "splitButtons"}
            disabled={buttonText === "Start" ? true : false}
            onClick={handerSplit}
          >
            Split
          </button>
          <button
            className={buttonText === "Pause" ? "resetbuttons" : "resetButtons"}
            disabled={buttonText === "Pause" ? true : false}
            onClick={() => setTime(0)}
          >
            Reset
          </button>
        </div>

        <hr></hr>
      </div>
      <LogTable data={data} />
    </>
  );
};
export default Stopwatch;

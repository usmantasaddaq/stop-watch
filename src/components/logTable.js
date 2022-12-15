import React from "react";
import "./logtable.css";

function LogTable({ data }) {
  return (
    <>
      <div className="logTableStyle">
        {data?.map((e, i) => (
          <table>
            <tr className="tabledata">
              <th>#{i + 1}</th>
              <th>
                {e.hrs}:{e.mins}:{e.sec}.{e.milis}
                {e.misc}
              </th>
              <th style={{ color: "lightgray" }}>{e.value}</th>
            </tr>
          </table>
        ))}
      </div>
    </>
  );
}

export default LogTable;

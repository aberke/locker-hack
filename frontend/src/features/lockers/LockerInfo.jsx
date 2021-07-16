import React, { useEffect, useState } from "react";

export default (props) => {
  const { name, vicinity } = props.info;
  const addressItems = vicinity.replace("at ", "").split(",");
  return (
    <div className="flex-col flex">
      <div className="flex-row p-1 text-base font-bold border-b">{name}</div>
      <div className="flex-col p-1 border m-1 text-sm items-left">
        {addressItems.map((addressLine) => (
          <div
            key={addressLine.trim().split(" ").join("-")}
            className="flex-row justify-left"
          >
            {addressLine}
          </div>
        ))}
      </div>
    </div>
  );
};

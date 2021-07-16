import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAsks } from "../../api";
import FlatList from "flatlist-react";
import AskItem from "./AskItem";
import { getLockerInfoFromPlaceId } from "../lockers/api";

export default () => {
  const asks = useQuery("asks", getAsks, {
    select: (d) => d.asks,
    onSuccess: (data) => {
      data.forEach(() => {
        console.log(
          "locker info:",
          getLockerInfoFromPlaceId(data.locker_place_id)
        );
      });
    },
  });

  if (asks.status == "success") {
    console.log(asks.data);
    return (
      <div className="flex flex-col w-full">
        <FlatList
          list={asks.data}
          renderItem={(a) => {
            return <AskItem ask={a} />;
          }}
          keyExtractor={(a) => a.id}
        />
      </div>
    );
  } else if (asks.status == "loading") {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Sorry!</h1>
      </div>
    );
  }
};

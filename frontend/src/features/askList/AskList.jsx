import React from "react";
import { useQuery } from "react-query";
import { getAsks } from "../../api";
import FlatList from "flatlist-react";
import AskItem from "./AskItem";

function AskList () {
  const asks = useQuery("asks", getAsks, {
    onSuccess: (data) => {
      console.log("asks", data);
    },
  });

  if (asks.status === "success") {
    return (
      <div className="flex flex-col w-full">
        <FlatList
          list={asks.data}
          renderItem={(a) => {
            return <AskItem key={a.id} ask={a} />;
          }}
          keyExtractor={(a) => a.id}
        />
      </div>
    );
  } else if (asks.status === "loading") {
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

export default AskList;

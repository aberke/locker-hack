import React, { useState } from "react";
import ItemIframe from "../item/ItemIframe";
import moment from "moment";
import LockerMap from "../../features/lockers/LockerMap";
import { AskUrlManager } from "../../helpers/AskManager";

export default ({ ask }) => {
  // ask:
  // code: "m0b7"
  // created: "Fri, 16 Jul 2021 14:31:36 GMT"
  // id: 1
  // item_asin: "B08S7ND492"
  // item_name: null
  // item_url: "https://www.amazon.com/Auto-Empty-Laser-Based-Navigation-Detection-Multi-Floor/dp/B08S7ND492??tag=mutualsupply-20"
  // locker_place_id: "ChIJD9mAj_N544kRhpIqhGRr_bU"
  // notes: [{…}]
  // price: null
  // quantity: 1
  // status: "open"
  // updated: "Fri, 16 Jul 2021 14:31:36 GMT"

  console.log("Got an ask:", ask);
  const askerNote = ask.notes[0].text;
  const askUrl = AskUrlManager.getAskUrl(ask.id);
  return (
    <div className="flex flex-col border rounded-lg m-2 p-2">
      <div className="flex flex-row p-2 font-bold w-full">
        <h1>{moment(ask.created).format("LL")} </h1>
      </div>
      <div className="flex flex-row w-full items-center justify-start">
        <ItemIframe asin={ask.item_asin} />
        <div className="flex-shrink w-64 h-64 m-3">
          {ask.locker && (
            <LockerMap
              lockers={[ask.locker]}
              selectedLocker={ask.locker}
              zoom={15}
            ></LockerMap>
          )}
        </div>
      </div>
      <div>
        <h3>Note:</h3>
        <p>{askerNote}</p>
      </div>
      <div>
          <a href={askUrl}>Buy it: {askUrl}</a>
      </div>
    </div>
  );
};

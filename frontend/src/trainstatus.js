import React from "react";

const Trainstatus = (livedata) => {
  console.log(livedata.livedata.current_location_info[0]);
  return (
    <div>
      <div
        className={`flex flex-col  bg-blue-50 border border-blue-300 h-[10vh] rounded-md mt-2  p-4`}
      >
        <div className="mb-2">
          <span className="font-bold">Current Station:</span>
          <span className="text-blue-900 ml-2">
            {livedata.livedata.current_station_name}
          </span>
          &nbsp;&nbsp;
          <span className="font-bold ml-4">Delay :</span>
          <span className="text-blue-900 ml-2">
            {livedata.livedata.delay}minutes
          </span>
        </div>
      </div>
    </div>
  );
};

export default Trainstatus;

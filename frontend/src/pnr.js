import React from "react";

const Pnr = (pnrdata) => {
  console.log(pnrdata);
  return (
    <div
      className={`flex flex-col bg-blue-50 border border-blue-300 h-[30vh] rounded-md mt-2  p-4`}
    >
      <div className="mb-2">
        <span className="font-bold">Train No:</span>
        <span className="text-blue-900 ml-2">{pnrdata.pnrdata.TrainNo}</span>
        <span className="font-bold ml-4">Train Name:</span>
        <span className="text-blue-900 ml-2">{pnrdata.pnrdata.TrainName}</span>
      </div>
      <div className="mb-2">
        <span className="font-bold">Date of Journey:</span>
        <span className="text-blue-900 ml-2">{pnrdata.pnrdata.Doj}</span>
        <span className="font-bold ml-4">Quota:</span>
        <span className="text-blue-900 ml-2">{pnrdata.pnrdata.Qouta}</span>
      </div>
      <div className="mb-2">
        <span className="font-bold">Chart Prepared:</span>
        <span className="text-blue-900 ml-2">
          {pnrdata.pnrdata.ChartPrepared}
        </span>
      </div>
      <div className="mb-2">
        <span className="font-bold">Coach:</span>
        <span className="text-blue-900 ml-2">
          {pnrdata.pnrdata.PassengerStatus[0].Coach}
        </span>
        <span className="font-bold ml-4">Berth:</span>
        <span className="text-blue-900 ml-2">
          {pnrdata.pnrdata.PassengerStatus[0].Berth}
        </span>
      </div>
      <div>
        <span className="font-bold">Boarding Station:</span>
        <span className="text-blue-900 ml-2">{pnrdata.pnrdata.SourceName}</span>
        <span className="font-bold ml-4">Destination Station:</span>
        <span className="text-blue-900 ml-2">
          {pnrdata.pnrdata.DestinationName}
        </span>
      </div>
    </div>
  );
};

export default Pnr;

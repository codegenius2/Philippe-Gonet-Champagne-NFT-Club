import React, { useEffect, useState } from "react";
// import "./CrossmintPayload.css";
// import { useLocation } from "react-router-dom";
import { useSearchParams } from "next/navigation";
import useCrossmintPayloadContext from "@/lib/context/CrossmintPayloadContext/useCrossmintPayload";

const CrossmintPayload = () => {
  //   const location = useLocation();
  const searchParams = useSearchParams();
  const { crossmintPayloadLocationdata, setCrossmintPayloadLocationdata } =
    useCrossmintPayloadContext();

  useEffect(() => {
    // const params = new URLSearchParams(location.search);
    // const pParam = params.get("p");

    const pParam = searchParams.get("p");
    console.log(pParam);

    if (pParam) {
      const decodedData = JSON.parse(decodeURIComponent(pParam));
      console.log("decodedData -> ", decodedData);
      setCrossmintPayloadLocationdata(decodedData);
      localStorage.setItem("crossmintPayload", JSON.stringify(decodedData[0]));
      setTimeout(() => {
        window.close();
      }, 200);
    }

    //   }, [location.search]);
  }, []);

  return (
    <div
      style={{
        zIndex: "999",
        background: "red",
        textAlign: "left",
        width: "500px",
      }}
    ></div>
  );
};

export default CrossmintPayload;

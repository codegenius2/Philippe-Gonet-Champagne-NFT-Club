import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCrossmintPayloadContext } from "@/contexts/CrossmintPayloadContext";

const CrossmintPayload = () => {
  const searchParams = useSearchParams();
  const { setCrossmintPayloadLocationdata } = useCrossmintPayloadContext();
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsMount(true);
    }, 2000);
  }, []);
  useEffect(() => {
    if (isMount) {
      setTimeout(() => {
        const pParam = searchParams.get("p");
        if (pParam) {
          const decodedData = JSON.parse(decodeURIComponent(pParam));
          console.log("decodedData -> ", decodedData);
          setCrossmintPayloadLocationdata(decodedData);
          localStorage.setItem(
            "crossmintPayload",
            JSON.stringify(decodedData[0])
          );
          setTimeout(() => {
            window.close();
          }, 200);
        }
      }, 2000);
    }
  }, [isMount]);
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

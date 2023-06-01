import { Route, Routes } from "react-router";

import Send from "../send/Send";
import Receive from "../rec/Receive";
import Peer from "peerjs";
import { useEffect, useState } from "react";

type Props = {};

export default function ShareLayout({}: Props) {
  const [peer, setPeer] = useState<Peer | undefined>();

  useEffect(() => {
    // const per = new Peer();
    // per.on("open", () => {
    //   setPeer(per);
    // });
    return () => {};
  }, []);
  return (
    <div style={{ paddingTop: "64px" }}>
      <Routes>
        <Route path="/share" element={<Send peer={peer} />} />
        <Route path="/recive/:id" element={<Receive />} />
        <Route
          path="*"
          element={
            <div
              style={{
                height: "100vh",
                border: "1px solid red",
              }}
            >
              Not found
            </div>
          }
        />
      </Routes>
    </div>
  );
}

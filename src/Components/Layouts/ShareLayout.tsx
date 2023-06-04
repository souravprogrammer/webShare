import { Route, Routes } from "react-router";

import { Suspense, lazy } from "react";

import Peer, { DataConnection } from "peerjs";
import { useEffect, useState } from "react";
import { InitinalData, MetaFileData } from "../../types/PeerTypes";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {};
// import Send from "../send/Send";
// import Receive from "../rec/Receive";

const Send = lazy(() => import("../send/Send"));
const Receive = lazy(() => import("../rec/Receive"));

export default function ShareLayout({}: Props) {
  const [peer, setPeer] = useState<Peer | undefined>();
  const [fileList, setFileList] = useState<Array<File>>([]);
  const [reciver, setReciver] = useState<DataConnection | null>(null);
  const [fileTransfering, setFileTransfering] = useState<MetaFileData | null>(
    null
  );

  useEffect(() => {
    const per = new Peer();
    per.on("open", () => {
      setPeer(per);
      // console.log("connection opened", id);
    });

    per?.on("connection", (con) => {
      // console.log("reciver connected ");

      // con.send({
      //   firstConnection: true,
      //   list: fileList.map((f) => ({
      //     name: f.name,
      //     type: f.type,
      //     size: f.size,
      //   })),
      // });
      con.on("open", () => {
        // const list = fileList.map((f) => {
        //   return {
        //     name: f.name,
        //   };
        // });

        // console.log("list", list);

        setReciver(con);
        // con.send({
        //   list: fileList.map((f) => ({
        //     name: f.name,
        //     size: f.size,
        //     type: f.type,
        //   })),
        // });
        con.on("data", (recivedData) => {
          // console.log("recivedData : ", recivedData);
          const resdata: InitinalData = recivedData as InitinalData;

          if (resdata.mode === "cancel") {
            // console.log("setting cancel ");
            setFileTransfering(null);
          } else if (!fileTransfering) {
            setFileTransfering(recivedData as MetaFileData);
          }
        });
      });
    });
    return () => {};
  }, []);
  async function sendChunckFile(
    file: File,
    CHUNCK_SIZE: number,
    meta: MetaFileData
  ) {
    const buffer = await file.arrayBuffer();

    // console.log("send  ", {
    //   chunck_numebr: buffer.byteLength / CHUNCK_SIZE,
    //   size: buffer.byteLength,
    // });

    for (let count = 0; count < buffer.byteLength; count += CHUNCK_SIZE) {
      // const start = i * chunkSize;
      // const end = (i + 1) * chunkSize;
      const chunck = buffer.slice(
        count,
        Math.min(count + CHUNCK_SIZE, buffer.byteLength)
      );

      const data: InitinalData = {
        mode: "dataTransfer",
        data: chunck,
        meta: meta,
        currentByte: count + CHUNCK_SIZE,
      };
      // console.count("send ");
      // console.log("send size ", buffer.byteLength, count + CHUNCK_SIZE);
      await reciver?.send(data);
    }
    await reciver?.send({
      mode: "complete",
      meta: meta,
      currentByte: meta.size,
    });
    setFileTransfering(null);
  }

  useEffect(() => {
    if (!fileTransfering) return;

    const metaObj = fileList.find((f) => f.name === fileTransfering.name);
    if (metaObj) {
      sendChunckFile(metaObj, 14 * 1024, fileTransfering);
    }
  }, [fileList, reciver, fileTransfering]);

  useEffect(() => {
    if (fileList.length > 0) {
      const list = fileList.map((f) => {
        return { name: f.name, type: f.type, size: f.size };
      });
      reciver?.send({ mode: "metaData", list: list });
    }
  }, [fileList, reciver]);
  return (
    <div style={{ paddingTop: "64px" }}>
      <Suspense
        fallback={
          <div
            style={{
              width: "100vw",
              height: "calc(100vh - 64px)",

              display: "grid",
              placeItems: "center",
            }}
          >
            {" "}
            <CircularProgress />
          </div>
        }
      >
        <Routes>
          <Route
            path="/share"
            element={
              <Send peer={peer} files={fileList} setFiles={setFileList} />
            }
          />
          <Route path="/recive/:id" element={<Receive peer={peer} />} />
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
      </Suspense>
    </div>
  );
}

import Peer, { DataConnection } from "peerjs";
import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { InitinalData, MetaFileData } from "../../types/PeerTypes";
import MyTable from "../../utils/MyTable";
import { TableHeading, TableRow } from "../../types/TableTypes";
// import CancelIcon from "@mui/icons-material/Cancel";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import LinearProgress from "@mui/material/LinearProgress";
type Props = {
  peer?: Peer;
};

export default function Receive({ peer }: Props) {
  const params = useParams();
  const [reciverPeer, setReciverPeer] = useState<DataConnection | null>(null);
  const [sharedList, setSharedList] = useState<any[]>([]);
  const file = useRef<Array<any>>([]);
  const [progress, setProgress] = useState<number>(0);

  // useEffect(() => {
  //   console.log("progress ", progress);
  // }, [progress]);

  useEffect(() => {
    // sender peer ID is here
    console.log(params.id);
    const conn = peer?.connect(params.id ?? "");
    conn?.on("open", function () {
      // Receive messages
      console.log("reciver open");
      setReciverPeer(conn);
      conn.on("data", (d: any) => {
        const data: InitinalData = d;
        console.log("reciver Received", data);
        if (data.mode === "metaData") {
          if (data.list) {
            const dd = data.list ?? [];
            setSharedList(() => [...dd]);
          }
        } else if (data.mode === "dataTransfer") {
          // do something here too

          file.current.push(data.data);
          console.count("data ");

          const percent = (data.currentByte ?? 0) / (data.meta?.size ?? 1);
          // data?.currentByte ?? 0 / (data?.meta?.size ?? 1)) * 100
          setProgress(() => percent * 100);
        } else if (data.mode === "complete") {
          setProgress(0);
          const ff = new Blob(file.current);
          ff.arrayBuffer().then((aa) => {
            console.log("file ", aa.byteLength, data.meta?.size);
          });

          file.current = [];

          const url = window.URL.createObjectURL(ff);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", data?.meta?.name ?? "noname.txt");

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
          link?.parentNode?.removeChild(link);
          console.log("file.current", file.current);
        }
      });
    });
  }, [peer]);

  useEffect(() => {
    console.log(">. ", sharedList);
  }, [sharedList]);

  const tableHeading: TableHeading[] = [
    {
      name: "name",
      align: "left",
    },
    {
      name: "size",
      align: "left",
    },
    {
      name: "action",
      align: "right",
    },
  ];

  const tableData: TableRow[][] = sharedList?.map((f) => {
    console.log("got");
    return [
      { name: f.name, align: "left" },
      { name: f.size / 1024, align: "left" },
      {
        align: "right",
        Action: () => {
          return (
            <div>
              <IconButton
                onClick={async () => {
                  await handleDownlaod(f);
                }}
              >
                <DownloadIcon />
              </IconButton>
            </div>
          );
        },
      },
    ];
  }) as TableRow[][];

  const handleDownlaod = async (file: MetaFileData) => {
    reciverPeer?.send(file);
  };
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={"bold"}
          sx={{
            py: 2,
          }}
        >
          {"Shared Files"}
        </Typography>

        <Box
          sx={{
            width: "calc(100% - 150px)",
            display: "flex",
            alignItems: "center",
            py: 2,
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: "100%",
              py: 4,
            }}
          >
            {progress ? (
              <LinearProgress variant="determinate" value={progress} />
            ) : null}
          </Box>
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            sx={{ width: "100%" }}
            py={1}
          >
            <Button variant="outlined" startIcon={<DownloadIcon />}>
              Download All
            </Button>
          </Box>
          <MyTable headings={tableHeading} data={tableData} />
        </Box>
      </Box>
    </div>
  );
}

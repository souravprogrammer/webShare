import Peer from "peerjs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import MyTable from "../../utils/MyTable";

import MyUpload from "../../utils/MyUpload";
import { TableHeading, TableRow } from "../../types/TableTypes";
import CancelIcon from "@mui/icons-material/Cancel";
import { TextField, Button } from "@mui/material";

type Props = {
  peer?: Peer;
  files?: Array<File>;
  setFiles: Function;
};

export default function Send({ peer, files, setFiles }: Props) {
  const uploadhandler = (f: FileList) => {
    const file = [];
    for (let i = 0; i < f.length; i++) {
      file.push(f[i]);
      console.log(f[i]);
    }
    setFiles?.(file);
  };

  const TableHeading: TableHeading[] = [
    {
      name: "Name",
      align: "left",
    },
    {
      name: "file Size",
      align: "left",
    },
    {
      name: "Action",
      align: "right",
    },
  ];
  const tableData: TableRow[][] = files?.map((f, i) => {
    console.log("got");
    return [
      { name: f.name, align: "left" },
      { name: f.size / 1024, align: "left" },
      {
        align: "right",
        Action: () => {
          return (
            <div>
              <IconButton>
                <CancelIcon />
              </IconButton>
            </div>
          );
        },
      },
    ];
  }) as TableRow[][];

  return (
    <div
      style={{
        padding: "16px 0px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "calc(100% - 150px)",
            display: "flex",
            alignItems: "center",
            py: 2,
          }}
        >
          <Typography>Share this Link to share file</Typography>
          <TextField
            hiddenLabel
            variant="filled"
            size="small"
            value={`http://localhost:5173/recive/${peer?.id}`}
            sx={{
              mx: 2,
            }}
          />
          <Button variant="outlined" size="small">
            CopyText
          </Button>
        </Box>
      </Box>

      <MyUpload onChange={uploadhandler} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "250px",
        }}
      >
        <Box
          sx={{
            width: "calc(100% - 150px)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={"bold"}
            sx={{
              py: 2,
            }}
          >
            {"Your Files"}
          </Typography>

          <MyTable data={tableData} headings={TableHeading} />
        </Box>
      </Box>
    </div>
  );
}

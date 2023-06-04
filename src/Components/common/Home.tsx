// import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import HubIcon from "@mui/icons-material/Hub";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";

type Props = {
  Icon?: any;
  text?: string;
};

export default function Home({}: Props) {
  return (
    <Paper
      sx={{
        backgroundColor: "primary.main",
        height: "100vh",
        display: "grid",
        placeItems: "center",
        // borderRadius: "0px 0px 10% 10%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight={"bold"} sx={{ color: "#fff" }}>
          Share files directly from your device to anywhere
        </Typography>
        <Typography variant="body1" sx={{ color: "#fff" }}>
          Send files of any size directly from your device without ever storing
          anything online.
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "2",
            p: 2,
          }}
        >
          <Row Icon={AllInclusiveIcon} text="No file size limit" />
          <Row Icon={ElectricBoltIcon} text="Blazingly fast" />{" "}
          <Row Icon={HubIcon} text="Peer-to-peer" />{" "}
          <Row Icon={EnhancedEncryptionIcon} text="End-to-end encrypted" />
        </Box>
        <Box>
          <Button
            variant="contained"
            color={"button" as "primary"}
            sx={{ width: "200px" }}
          >
            Start Sharing
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

const Row = (props: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        // p: 1,
      }}
    >
      <props.Icon sx={{ color: "#fff", mx: 1, height: "22px" }} />
      <Typography sx={{ color: "#fff", mx: 1 }}>{props.text}</Typography>
    </Box>
  );
};

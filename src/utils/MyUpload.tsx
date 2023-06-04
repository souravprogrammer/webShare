import React, { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Grid,
  Typography,
  // TextField,
  Icon,
  // Avatar,
  // Box,
  // IconButton,
} from "@mui/material";
// import CircularProgress from "@mui/material/CircularProgress";
// import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";

type Props = {
  /**
   *
   * @param props - retuns a list of files selected by the user
   * @returns {void}
   *
   */
  onChange?: (props: FileList) => void;
};
function MyUpload({ onChange }: Props) {
  const fileRef = useRef<any>(null);
  const uploadAreaRef = useRef<any>(null);

  //   const handelUploadField = (e: React.MouseEvent) => {
  //     fileRef.current.children[0].children[0].click();
  //   };
  const handleDragEnter_Start = () => {
    uploadAreaRef.current.style.opacity = "0.3";
  };
  const handleLeave = () => {
    uploadAreaRef.current.style.opacity = "1";
  };
  const handleDrop = () => {
    uploadAreaRef.current.style.opacity = "1";
  };

  const handelUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onChange?.(e.target.files);
  };
  return (
    <Grid
      container
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        // border: "1px solid red",
        flexDirection: "column",
        height: "250px",
      }}
    >
      <Grid
        item
        sx={{
          width: "calc(100% - 150px)",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}
      >
        <Grid
          //   onClick={handelUploadField}
          ref={uploadAreaRef}
          onDragEnter={handleDragEnter_Start}
          onDragOver={handleDragEnter_Start}
          onDragLeave={handleLeave}
          onDrop={handleDrop}
          sx={{
            width: "100%",
            // height: "150px",
            height: "100%",
            borderRadius: "4px",
            cursor: "pointer",
            // border:
            //   blur.image && error.image !== null
            //     ? "2px dashed #D32F2F"
            //     : "2px dashed #ced4da",
            border: "2px dashed #ced4da",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            rowGap: "8px",
            // mb: blur.image && error.image !== null ? "0px" : "24px",
          }}
        >
          <Icon
            sx={{
              width: "40px",
              height: "40px",
            }}
          >
            <CloudUploadIcon sx={{ width: "100%", height: "100%" }} />
          </Icon>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              textTransform: "capitalize",
              p: "8px 0px",
            }}
          >
            Drop files here or click to upload.
          </Typography>

          <input
            ref={fileRef}
            type="file"
            onChange={handelUploadFiles}
            multiple={true}
            style={{
              position: "absolute",
              width: "100%",

              border: "1px solid red",
              height: "100%",
              opacity: 0,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default React.memo(MyUpload);

import { useState } from "react";
import { Button, Typography, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface CopyTextProps {
  text: string;
  icon?: string;
}

const CopyText = ({ text = "", icon = "" }: CopyTextProps) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(text);
    setShowSnackbar(true);
  };

  return (
    <>
      <Button
        sx={{
          justifyContent: "flex-start",
          p: 1,
          color: "black",
          width: "100%",
        }}
        onClick={onCopy}
      >
        {icon && <img width="28px" src={icon} />}
        <Typography sx={{ ml: 1 }}>{text}</Typography>
        <ContentCopyIcon sx={{ marginLeft: "auto" }} />
      </Button>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={1500}
        onClose={() => setShowSnackbar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setShowSnackbar(false)}
          severity="success"
        >
          Copied successfully
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default CopyText;

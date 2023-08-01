import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useToast } from "./ToastProvider";
import { useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast() {
  const { show } = useToast();
  const [open, setOpen] = useState<boolean>(false);

  React.useEffect(() => {
    if (show && show.message != "") {
      setOpen(true);
    }
  }, [show]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={show.duration ? show.duration : 6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: show.vertical ? show.vertical : "top",
        horizontal: show.horizontal ? show.horizontal : "center",
      }}
    >
      <Alert
        onClose={handleClose}
        severity={show.severity}
        sx={{ width: "100%" }}
      >
        {show.message}
      </Alert>
    </Snackbar>
  );
}

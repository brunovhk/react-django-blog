import { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import type { ReactNode } from "react";
import type { AlertColor } from "@mui/material";

interface SnackbarContextType {
  showMessage: (message: string, severity?: AlertColor) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  const showMessage = (msg: string, type: AlertColor = "info") => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ width: "100%", maxWidth: "480px", mx: "auto" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          variant="filled"
          sx={{
            width: "100%",
            fontSize: "1rem",
            py: 1.5,
            px: 3,
            boxShadow: 3,
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error("useSnackbar must be used within SnackbarProvider");
  return context;
};

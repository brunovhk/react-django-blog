import { useEffect } from "react";
import { useSnackbar } from "@/components/SnackbarProvider";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { showMessage } = useSnackbar();
  useEffect(() => {
    showMessage("Page not found.", "error");
  }, []);
  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" gutterBottom>
        404 – Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        The page you're looking for doesn't exist or was moved.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go back to Home
      </Button>
    </Box>
  );
}

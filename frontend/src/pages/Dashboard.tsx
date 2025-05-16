import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Autocomplete,
} from "@mui/material";
import ReactQuill from "react-quill";
import api from "@/api/api";
import { useSnackbar } from "@/components/SnackbarProvider";

export default function Dashboard() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tag_names: [] as string[],
  });

  const { showMessage } = useSnackbar();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("posts/", form);
      showMessage("Post created successfully!", "success");
      setForm({ title: "", content: "", tag_names: [] });
    } catch (err) {
      showMessage("Failed to create post", "error");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Create New Post
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Box sx={{ mt: 2 }}>
                <ReactQuill
                  theme="snow"
                  value={form.content}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, content: value }))
                  }
                  style={{ height: "200px", marginBottom: "40px" }}
                />
              </Box>
              <Autocomplete
                multiple
                freeSolo
                options={[]} // Tags suggestion
                value={form.tag_names}
                onChange={(_, newValue) => {
                  setForm({ ...form, tag_names: newValue });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    placeholder="Press Enter to add"
                    margin="normal"
                    fullWidth
                  />
                )}
              />

              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Publish
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

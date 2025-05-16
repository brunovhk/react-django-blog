import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import ReactQuill from "react-quill";
import api from "@/api/api";
import { useSnackbar } from "@/components/SnackbarProvider";

export default function Dashboard() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
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
      setForm({ title: "", content: "", tags: "" });
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
                key={form.content.length === 0 ? "empty" : "filled"}
                  theme="snow"
                  value={form.content}
                  onChange={(value) => setForm({ ...form, content: value })}
                  style={{ height: "200px", marginBottom: "40px" }}
                />
              </Box>
              <TextField
                label="Tags (comma-separated)"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                fullWidth
                margin="normal"
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

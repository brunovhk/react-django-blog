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
import api from "../api/api";

export default function Dashboard() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("posts/", form);
      alert("Post created successfully!");
      setForm({ title: "", content: "", tags: "" });
    } catch (err) {
      alert("Failed to create post");
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
              <TextField
                label="Content"
                name="content"
                value={form.content}
                onChange={handleChange}
                fullWidth
                multiline
                rows={6}
                margin="normal"
              />
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

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  Grid,
  CardActions,
  CardContent,
  Autocomplete,
} from "@mui/material";
import ReactQuill from "react-quill";
import api from "@/api/api";
import { useSnackbar } from "@/components/SnackbarProvider";

// Post interface
interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  tag_names: string[];
}

export default function Dashboard() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tag_names: [] as string[],
  });
  const [myPosts, setMyPosts] = useState<Post[]>([]);

  const { showMessage } = useSnackbar();

  const fetchMyPosts = async () => {
    try {
      const response = await api.get("posts/my-posts/");
      setMyPosts(response.data);
    } catch (err) {
      showMessage("Failed to load your posts", "error");
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

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
      fetchMyPosts();
    } catch (err) {
      showMessage("Failed to create post", "error");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.delete(`posts/${id}/`);
      showMessage("Post deleted successfully!", "success");
      fetchMyPosts();
    } catch (err) {
      showMessage("Failed to delete post", "error");
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Form to create a new post */}
      <Card sx={{ mb: 4 }}>
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
              options={[]}
              value={form.tag_names}
              onChange={(_, newValue) => {
                setForm((prev) => ({ ...prev, tag_names: newValue }));
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

      {/* User posts list */}
      <Typography variant="h6" gutterBottom>
        Your Posts
      </Typography>
      <Grid container spacing={2}>
        {myPosts.map((post) => (
          <Grid size={{ xs: 6 }} key={post.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(post.created_at).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                {/* Edit post (WIP) */}
                {/* <Button size="small" onClick={() => handleEdit(post)}>Edit</Button> */}
                <Button
                  size="small"
                  color="error"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import api from "@/api/api";
import { useSnackbar } from "@/components/SnackbarProvider";

interface Post {
  id: number;
  title: string;
  author_username: string;
  created_at: string;
  tags: string[];
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const { showMessage } = useSnackbar();

  useEffect(() => {
    api
      .get("posts/")
      .then((res) => setPosts(res.data.results || res.data))
      .catch(() => showMessage("Failed to load posts", "error"))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !posts) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 6,
          gap: 2,
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Loading posts...
        </Typography>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ my: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ borderLeft: "4px solid", pl: 2, borderColor: "primary.main" }}
      >
        Latest Posts
      </Typography>

      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={post.id}
            sx={{
              transition: "0.3s",
              "&:hover": { transform: "translateY(-4px)", boxShadow: 3 },
            }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  By {post.author_username} on{" "}
                  {new Date(post.created_at).toLocaleDateString()}
                </Typography>
                <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {post.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/posts/${post.id}`}>
                  View Post
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

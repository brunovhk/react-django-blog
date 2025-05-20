import { useEffect, useState, useRef } from "react";
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
  Pagination,
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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { showMessage } = useSnackbar();

  const fetchPosts = (page = 1) => {
    api
      .get(`posts/?page=${page}`)
      .then((res) => {
        setPosts(res.data.results || res.data);
        setTotalPages(Math.ceil(res.data.count / 12));
      })
      .catch(() => showMessage("Failed to load posts", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

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
    <Container ref={containerRef} sx={{ my: 4 }}>
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
              display: "flex",
              width: "100%",
              transition: "0.3s",
              "&:hover": { transform: "translateY(-4px)", boxShadow: 3 },
            }}
          >
            <Card
              sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Post Title */}
                <Typography variant="h6" component="div" gutterBottom>
                  {post.title}
                </Typography>
                {/* Post Author */}
                <Typography variant="body2" color="text.secondary">
                  By {post.author_username} on{" "}
                  {new Date(post.created_at).toLocaleDateString()}
                </Typography>
                {/* Post Tags */}
                <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {post.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: "secondary.main",
                      }}
                    />
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
      {/* No posts found */}
      {!loading && posts.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          No posts found.
        </Typography>
      )}
      {/* Pagination */}
      {posts.length > 0 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => {
              setPage(value);
              containerRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}

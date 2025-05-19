import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Box,
} from "@mui/material";
import api from "@/api/api";
import { useSnackbar } from "@/components/SnackbarProvider";

interface PostSummary {
  id: number;
  title: string;
  created_at: string;
}

interface AuthorStats {
  username: string;
  total_posts: number;
  total_comments: number;
  posts: PostSummary[];
}

export default function AuthorProfile() {
  const { username } = useParams();
  const [data, setData] = useState<AuthorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { showMessage } = useSnackbar();

  useEffect(() => {
    api
      .get(`users/author/${username}/`)
      .then((res) => setData(res.data))
      .catch(() => showMessage("Failed to load author profile", "error"))
      .finally(() => setLoading(false));
  }, [username]);

  if (loading || !data)
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
          Loading Author Profile...
        </Typography>
        <CircularProgress />
      </Box>
    );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Author: {data.username}
      </Typography>
      <Typography variant="body1">
        Total posts: <strong>{data.total_posts}</strong>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Total comments: <strong>{data.total_comments}</strong>
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Posts by {data.username}
        </Typography>

        <Grid container spacing={2}>
          {data.posts.map((post) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1">{post.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(post.created_at).toLocaleDateString()}
                  </Typography>
                  <Link to={`/posts/${post.id}`}>View Post</Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

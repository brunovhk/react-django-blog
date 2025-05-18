import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
} from "@mui/material";
// Types
import type { Post } from "@/types/Post";

interface PostListProps {
  posts: Post[];
  onEdit?: (post: Post) => void;
  onDelete?: (id: number) => void;
}

export default function PostList({ posts, onEdit, onDelete }: PostListProps) {
  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid size={{ xs: 12 }} key={post.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(post.created_at).toLocaleDateString()}
              </Typography>
            </CardContent>
            {(onEdit || onDelete) && (
              <CardActions>
                {onEdit && (
                  <Button size="small" onClick={() => onEdit(post)}>
                    Edit
                  </Button>
                )}
                {onDelete && (
                  <Button
                    size="small"
                    color="error"
                    onClick={() => onDelete(post.id)}
                  >
                    Delete
                  </Button>
                )}
              </CardActions>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

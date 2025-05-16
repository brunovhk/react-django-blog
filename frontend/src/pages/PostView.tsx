import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  Chip,
  CircularProgress,
  CardContent,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import api from "@/api/api";
import { useSnackbar } from "@/components/SnackbarProvider";
import { useAuth } from "@/auth/AuthContext";

interface Post {
  id: number;
  title: string;
  content: string;
  author_username: string;
  created_at: string;
  tags: string[];
}

interface Comment {
  id: number;
  content: string;
  author_username: string;
  created_at: string;
  replies: Comment[];
  parent: number | null;
}

export default function PostView() {
  const { showMessage } = useSnackbar();
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyParentId, setReplyParentId] = useState<number | null>(null);

  const stringToColor = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 60%, 60%)`;
  };

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postRes, commentRes] = await Promise.all([
          api.get(`posts/${id}/`),
          api.get(`comments/?post=${id}`),
        ]);
        setPost(postRes.data);
        setComments(commentRes.data);
      } catch (error) {
        showMessage("Failed to load post", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) {
      showMessage("Please enter a valid comment before submitting.", "warning");
      return;
    }

    try {
      await api.post("comments/", {
        post: id,
        content: newComment,
        parent: replyParentId,
      });

      setNewComment("");
      setReplyParentId(null);

      const res = await api.get(`comments/?post=${id}`);
      setComments(res.data.results);

      showMessage(
        "Comment submitted successfully! Awaiting moderation.",
        "success"
      );
    } catch {
      showMessage("Failed to submit comment. Try again.", "error");
    }
  };

  const renderComments = (comments: Comment[], level = 0) => (
    <Box sx={{ pl: level * 4, mt: 1 }}>
      {comments.map((c) => (
        <Card key={c.id} sx={{ mb: 1 }}>
          <CardContent
            sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
          >
            <Avatar sx={{ bgcolor: stringToColor(c.author_username) }}>
              {c.author_username.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle2">
                {c.author_username} —{" "}
                {new Date(c.created_at).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">{c.content}</Typography>
              {isAuthenticated && (
                <Button size="small" onClick={() => setReplyParentId(c.id)}>
                  Reply
                </Button>
              )}
              {c.replies && renderComments(c.replies, level + 1)}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  if (loading || !post)
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
          Loading post...
        </Typography>
        <CircularProgress />
      </Box>
    );

  return (
    <Container sx={{ mt: 4 }}>
      {/* Post Title */}
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      {/* Post Author */}
      <Typography variant="subtitle1" gutterBottom>
        By{" "}
        <Link to={`/authors/${post.author_username}`}>
          {post.author_username}
        </Link>{" "}
        on {new Date(post.created_at).toLocaleDateString()}
      </Typography>
      {/* Post content */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="body1"
          component="div"
          sx={{ whiteSpace: "pre-line" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Box>
      {/* Post Tags */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Tags:
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {post.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
        </Box>
      </Box>
      {/* Post Comments */}
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      {comments.length > 0 ? (
        renderComments(comments)
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mt: 2,
            opacity: 0.8,
            animation: "fadeIn 0.5s ease-in",
          }}
        >
          <InfoIcon color="action" />
          <Typography variant="body2" color="text.secondary">
            There are no comments on this post yet.
          </Typography>
        </Box>
      )}

      {isAuthenticated && (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label={replyParentId ? "Reply to comment" : "Add a comment"}
            fullWidth
            multiline
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Box sx={{ mt: 1 }}>
            {replyParentId && (
              <Button size="small" onClick={() => setReplyParentId(null)}>
                Cancel Reply
              </Button>
            )}
            <Button type="submit" variant="contained" sx={{ ml: 1 }}>
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}

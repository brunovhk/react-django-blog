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
import ReplyIcon from "@mui/icons-material/Reply";
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

  const nestComments = (flatComments: Comment[]): Comment[] => {
    const commentMap = new Map<number, Comment & { replies: Comment[] }>();
    const rootComments: Comment[] = [];

    flatComments.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    commentMap.forEach((comment) => {
      if (comment.parent) {
        const parent = commentMap.get(comment.parent);
        if (parent) {
          parent.replies.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    return rootComments;
  };

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const [postRes, commentRes] = await Promise.all([
          api.get(`posts/${id}/`),
          api.get(`comments/?post=${id}`),
        ]);
        setPost(postRes.data);
        const flat = commentRes.data.results || commentRes.data;
        setComments(nestComments(flat));
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
      const flat = res.data.results || res.data;
      setComments(nestComments(flat));

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
        <Box
          key={c.id}
          sx={{
            borderLeft: level > 0 ? "2px solid #e0e0e0" : "none",
            pl: level > 0 ? 2 : 0,
            ml: level > 0 ? 1 : 0,
            mt: 1,
            p: 1.5,
            bgcolor: "#fff",
            borderRadius: 1,
            boxShadow: level === 0 ? 1 : 0,
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <Avatar sx={{ bgcolor: stringToColor(c.author_username) }}>
              {c.author_username.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle2">
                {c.author_username} —{" "}
                {new Date(c.created_at).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>
                {c.content}
              </Typography>
              {isAuthenticated && (
                <Button
                  size="small"
                  startIcon={<ReplyIcon />}
                  onClick={() => setReplyParentId(c.id)}
                  sx={{ mt: 0.5 }}
                >
                  Reply
                </Button>
              )}
              {c.replies && renderComments(c.replies, level + 1)}
            </Box>
          </Box>
        </Box>
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
    <Container sx={{ my: 6 }}>
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
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
          <Typography
            variant="body1"
            component="div"
            sx={{ whiteSpace: "pre-line", mt: 2 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <Box sx={{ mt: 3 }}>
            {/* Post tags */}
            <Typography variant="subtitle2" gutterBottom>
              Tags:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    bgcolor: "secondary.main",
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>
          </Box>
        </CardContent>
      </Card>
      {/* Post Comments */}
      <Typography variant="h6" gutterBottom sx={{ mt: 5 }}>
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

      {isAuthenticated ? (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label={replyParentId ? "Reply to comment" : "Add a comment"}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ bgcolor: "white" }}
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
      ) : (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            You must be logged in to leave a comment.
          </Typography>
          <Button
            variant="outlined"
            size="small"
            sx={{ mt: 1 }}
            component={Link}
            to="/login"
          >
            Login
          </Button>
        </Box>
      )}
    </Container>
  );
}

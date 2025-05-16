import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import api from "@/api/api";
import { useAuth } from "@/auth/AuthContext";

interface Post {
  id: number;
  title: string;
  content: string;
  author_username: string;
  created_at: string;
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
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyParentId, setReplyParentId] = useState<number | null>(null);

  useEffect(() => {
    api.get(`posts/${id}/`).then((res) => setPost(res.data));
    api
      .get(`comments/?post=${id}`)
      .then((res) => setComments(res.data.results));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

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
    } catch {
      alert("Failed to post comment");
    }
  };

  const renderComments = (comments: Comment[], level = 0) => (
    <Box sx={{ pl: level * 4, mt: 1 }}>
      {comments.map((c) => (
        <Card key={c.id} sx={{ mb: 1 }}>
          <CardContent>
            <Typography variant="subtitle2">
              {c.author_username} -{" "}
              {new Date(c.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">{c.content}</Typography>
            {isAuthenticated && (
              <Button size="small" onClick={() => setReplyParentId(c.id)}>
                Reply
              </Button>
            )}
            {c.replies && renderComments(c.replies, level + 1)}
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        By{" "}
        <Link to={`/authors/${post.author_username}`}>
          {post.author_username}
        </Link>{" "}
        on {new Date(post.created_at).toLocaleDateString()}
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="body1"
          component="div"
          sx={{ whiteSpace: "pre-line" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Box>

      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      {renderComments(comments)}

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

import { useEffect, useState } from "react";
import { Card, CardContent, Container, Typography } from "@mui/material";
import api from "@/api/api";
import { useSnackbar } from "@/components/SnackbarProvider";
// Components
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import EditPostDialog from "@/components/EditPostDialog";
// Types
import type { Post } from "@/types/Post";

export default function Dashboard() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    tag_names: [] as string[],
  });
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    tag_names: [] as string[],
  });

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

  // Handle edit post
  const handleEdit = (post: Post) => {
    setEditPost(post);
    setEditForm({
      title: post.title,
      content: post.content,
      tag_names: post.tag_names || [],
    });
  };

  const handleUpdate = async () => {
    if (!editPost) return;
    try {
      await api.patch(`posts/${editPost.id}/`, editForm);
      showMessage("Post updated successfully!", "success");
      setEditPost(null);
      fetchMyPosts();
    } catch (error) {
      showMessage("Failed to update post", "error");
    }
  };

  // Handle delete post
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
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Create New Post
          </Typography>
          {/* Form to create a new post */}
          <PostForm form={form} setForm={setForm} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
      <Typography variant="h6" gutterBottom>
        Your Posts
      </Typography>
      {/* User posts list */}
      <PostList posts={myPosts} onEdit={handleEdit} onDelete={handleDelete} />
      {/* Edit post dialog */}
      <EditPostDialog
        open={!!editPost}
        onClose={() => setEditPost(null)}
        form={editForm}
        setForm={setEditForm}
        onSubmit={handleUpdate}
      />
    </Container>
  );
}

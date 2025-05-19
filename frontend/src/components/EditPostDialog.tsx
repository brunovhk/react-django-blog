import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import PostForm from "./PostForm";

export default function EditPostDialog({
  open,
  onClose,
  form,
  setForm,
  onSubmit,
}: any) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <PostForm
          form={form}
          setForm={setForm}
          onSubmit={onSubmit}
          submitLabel="Save Changes"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

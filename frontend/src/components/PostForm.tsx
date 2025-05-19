import { TextField, Box, Button, Autocomplete } from "@mui/material";
import ReactQuill from "react-quill";

interface PostFormProps {
  form: {
    title: string;
    content: string;
    tag_names: string[];
  };
  setForm: (updater: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
}

export default function PostForm({
  form,
  setForm,
  onSubmit,
  submitLabel = "Publish",
}: PostFormProps) {
  return (
    <Box component="form" onSubmit={onSubmit}>
      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={(e) =>
          setForm((prev: any) => ({ ...prev, title: e.target.value }))
        }
        fullWidth
        margin="normal"
      />
      <Box sx={{ mt: 2 }}>
        <ReactQuill
          theme="snow"
          value={form.content}
          onChange={(value) =>
            setForm((prev: any) => ({ ...prev, content: value }))
          }
          style={{ height: "200px", marginBottom: "40px" }}
        />
      </Box>
      <Autocomplete
        multiple
        freeSolo
        options={[]}
        value={form.tag_names}
        onChange={(_, newValue) =>
          setForm((prev: any) => ({ ...prev, tag_names: newValue }))
        }
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
        {submitLabel}
      </Button>
    </Box>
  );
}

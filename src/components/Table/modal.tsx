import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ModalUIProps } from ".";

function EditModal({
  isModalOpen,
  editData,
  handleInputChange,
  handleUpdateSubmit,
  setOpenModal,
}: ModalUIProps) {
  return (
    <Dialog open={isModalOpen} onClose={() => setOpenModal(false)}>
      <DialogTitle>Edit Row</DialogTitle>
      <DialogContent>
        {editData && (
          <>
            <TextField
              fullWidth
              margin="dense"
              name="name"
              label="Name"
              value={editData.name}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="dense"
              name="age"
              label="Age"
              type="number"
              value={editData.age}
              onChange={handleInputChange}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
        <Button variant="contained" onClick={handleUpdateSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;

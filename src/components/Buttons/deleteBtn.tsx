import { Button, Stack } from "@mui/material";
import { DeleteBtnProps } from ".";

function DeleteBtn({ handleDelete }: DeleteBtnProps) {
  return (
    <Stack>
      <Button color="error" onClick={() => handleDelete("delete")}>
        Delete
      </Button>
    </Stack>
  );
}

export default DeleteBtn;

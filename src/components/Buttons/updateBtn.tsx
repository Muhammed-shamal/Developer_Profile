import { Button, Stack } from "@mui/material";
import { UpdateBtnProps } from ".";

function UpdateBtn({ handleUpdate }: UpdateBtnProps) {
  return (
    <Stack>
      <Button color="primary" onClick={() => handleUpdate("edit")}>
        Update
      </Button>
    </Stack>
  );
}

export default UpdateBtn;

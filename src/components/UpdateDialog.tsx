import { Dialog, DialogTitle, colors, DialogContent, Button, Stack } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const { VERSION } = process.env;

const UpdateDialog = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle
        sx={{
          color: colors.green[500]
        }}
      >
        <Stack direction='row' gap={1} alignItems='center'>
          <InfoIcon />
          Update to {VERSION}
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Button
          fullWidth
          onClick={() => window.location.reload()}
          color='primary'
          variant='outlined'
        >
          Update
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;

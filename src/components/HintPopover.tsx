import * as React from 'react';
import Typography from '@mui/material/Typography';
import { colors, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';

const HintPopover = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClick} disableRipple>
        <InfoIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: colors.green[500] }}>
          <Typography>Advanced search options:</Typography>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ul>
            <li>
              <Typography>??? ➡ ΚΩ</Typography>
            </li>
            <li>
              <Typography>?B?Ρ* ➡ ΑΒΕΡΩΦ</Typography>
            </li>
            <li>
              <Typography>dous ➡ ΑΡΧΙΜΗΔΟΥΣ</Typography>
            </li>
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HintPopover;

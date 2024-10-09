import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface Props {
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
}

const ConfirmDialog = ({ open, handleClose, handleConfirm }: Props) => {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
            <DialogTitle></DialogTitle>
            <DialogContent>
                <p>
                    本当に削除しますか？ <br />
                    この処理は元に戻せません。
                </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm} autoFocus color='secondary'>
                    はい
                </Button>
                <Button onClick={handleClose} color='inherit'>
                    いいえ
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;

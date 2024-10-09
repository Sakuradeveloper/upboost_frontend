import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmDialog = ({ open, onClose, onConfirm }: Props) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle></DialogTitle>
            <DialogContent>
                <p>
                    本当に削除しますか？ <br />
                    この処理は元に戻せません。
                </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onConfirm} autoFocus color='secondary'>
                    はい
                </Button>
                <Button onClick={onClose} color='inherit'>
                    いいえ
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;

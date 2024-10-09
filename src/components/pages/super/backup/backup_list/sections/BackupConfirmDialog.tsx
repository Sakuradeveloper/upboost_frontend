interface Props {
    time: string;
    onClose: () => void;
    onAccept?: () => void;
    className?: string;
}

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import moment from 'moment';

const BackupConfirmDialog = ({ time, onClose, onAccept, className }: Props) => {
    return (
        <Dialog open={time != ''} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle sx={{ fontSize: 16, fontWeight: 700 }}>バックアップする</DialogTitle>
            <DialogContent>
                <p className='text-[14px] leading-[25px]'>
                    本当にバックアップしますか？ <br />
                    {moment(time).format('YYYY/MM/DD HH:mm:ss')}のデータでデータベースが初期化されます。
                </p>
            </DialogContent>
            <DialogActions>
                <Button autoFocus color='secondary' variant='contained' onClick={onAccept}>
                    はい
                </Button>
                <Button autoFocus color='secondary' variant='outlined' onClick={onClose}>
                    いいえ
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BackupConfirmDialog;

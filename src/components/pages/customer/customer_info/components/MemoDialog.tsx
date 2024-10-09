import { FormEvent, useState } from 'react';
import { useParams } from 'next/navigation';
import { patchRequest, postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError, fetchMemoByCustomerId, setCurrentItemValue, setError } from '@/store/features/memo';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface Props {
    open: boolean;
    handleClose: () => void;
}

const MemoDialog = ({ open, handleClose }: Props) => {
    const dispatch = useAppDispatch();
    const { id } = useParams();

    const currentItem = useAppSelector(state => state.memo.item.form);
    const errors = useAppSelector(state => state.memo.item.errors);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (currentItem.id) {
            // Update
            const res = await patchRequest(`/v0/customers/${id}/memo/${currentItem.id}`, currentItem);
            if (res.status == 200) {
                dispatch(clearError());
                handleClose();
                dispatch(fetchMemoByCustomerId(parseInt(`${id}`)));
            }
            if (res.status == 422 && res.data.errors) {
                dispatch(setError(res.data.errors));
            }
        } else {
            // Create
            const res = await postRequest(`/v0/customers/${id}/memo/create`, currentItem);
            if (res.status == 200) {
                dispatch(clearError());
                handleClose();
                dispatch(fetchMemoByCustomerId(parseInt(`${id}`)));
            }
            if (res.status == 422 && res.data.errors) {
                dispatch(setError(res.data.errors));
            }
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
            <DialogTitle sx={{ fontSize: 14, fontWeight: 700 }}>
                {currentItem.id ? 'メモを編集' : 'メモを作成'}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} className='pt-[8px]'>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={currentItem.content}
                        onChange={e => dispatch(setCurrentItemValue({ content: e.target.value }))}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit} autoFocus color='secondary'>
                    保存
                </Button>
                <Button onClick={handleClose} color='inherit'>
                    キャンセル
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MemoDialog;

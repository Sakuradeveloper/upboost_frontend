import { useAuth } from '@/contexts/AuthContext';
import { BACKEND_URL, postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearFilter, fetchBackupList, setFilterValue } from '@/store/features/backup';

import { Button, InputAdornment, TextField } from '@mui/material';
import { IoSearch } from 'react-icons/io5';

const Filter = () => {
    const { setPending } = useAuth();
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.backup.items.filter);

    const handleBackup = async () => {
        setPending!(true);

        const res = await postRequest(`${BACKEND_URL}/api/v0/owner/backup/create`, {});

        dispatch(fetchBackupList(filter));

        setPending!(false);
    };

    return (
        <div className='w-full flex flex-col-reverse xl:flex-row items-end xl:items-center justify-between gap-[16px] mb-[16px]'>
            <div className='w-full flex flex-col sm:flex-row items-center justify-between gap-[20px]'>
                <div className='w-full flex'>
                    <TextField
                        fullWidth
                        size='small'
                        value={filter.keyword}
                        onChange={e => dispatch(setFilterValue({ keyword: e.target.value, page: 0, pageSize: 10 }))}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <IoSearch />
                                </InputAdornment>
                            )
                        }}
                        placeholder='検索ワードを入力'
                    />
                </div>

                <Button
                    variant='contained'
                    fullWidth
                    color='primary'
                    size='small'
                    onClick={handleBackup}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        px: 3,
                        whiteSpace: 'nowrap',
                        maxWidth: 150
                    }}
                >
                    バックアップする
                </Button>
            </div>
        </div>
    );
};

export default Filter;

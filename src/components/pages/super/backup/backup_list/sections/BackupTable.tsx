import { useState } from 'react';
import { BACKEND_URL, getBlobRequest, postRequest } from '@/utils/axios';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import FileDownload from 'js-file-download';

import { Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import BackupConfirmDialog from './BackupConfirmDialog';

const CustomerTable = () => {
    const { setPending } = useAuth();

    const [backupTime, setBackupTime] = useState('');
    const result = useAppSelector(state => state.backup.items.result);

    const handleDownload = async (time: string, type: string) => {
        const res = await getBlobRequest(`${BACKEND_URL}/api/v0/owner/backup/download`, {
            time,
            type
        });

        if (res.status == 200) {
            FileDownload(res.data, `cms_wavemaster_${type}_backup_${time}.${type === 'db' ? 'sql' : 'tar'}`);
        }
    };

    const handleResetData = async () => {
        setPending!(true);

        const res = await postRequest(`${BACKEND_URL}/api/v0/owner/backup/load`, {
            time: backupTime
        });

        setBackupTime('');
        setPending!(false);
    };

    return (
        <>
            <TableContainer>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>バックアップ日時</TableCell>
                            <TableCell>ファイル</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result.data.map(backup => {
                            return (
                                <TableRow hover role='checkbox' tabIndex={-1} key={backup.time}>
                                    <TableCell className=' whitespace-nowrap'>{backup.time}</TableCell>
                                    <TableCell className='w-full' sx={{ textAlign: 'left' }}>
                                        <button
                                            className='block text-left hover:text-[#2196f3] underline underline-offset-4'
                                            onClick={() => handleDownload(backup.time, 'db')}
                                        >
                                            DB : {backup.db}
                                        </button>
                                        <button
                                            className='block text-left hover:text-[#2196f3] underline underline-offset-4'
                                            onClick={() => handleDownload(backup.time, 'media')}
                                        >
                                            MEDIA : {backup.media}
                                        </button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            className=' whitespace-nowrap'
                                            onClick={() => setBackupTime(backup.time)}
                                        >
                                            設定する
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}

                        {result.data.length === 0 && (
                            <TableRow className='h-[100px]'>
                                <TableCell colSpan={3} align='center'>
                                    <div className='w-full flex flex-col items-center justify-center gap-3'>
                                        <FolderOpenIcon sx={{ fontSize: 100 }} className='text-[#697586]' />

                                        <p>
                                            バックアップ情報が見つかりませんでした。
                                            <br />
                                            検索条件を変更して再度検索してください。
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <BackupConfirmDialog time={backupTime} onClose={() => setBackupTime('')} onAccept={handleResetData} />
        </>
    );
};

export default CustomerTable;

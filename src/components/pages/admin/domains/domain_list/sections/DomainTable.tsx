import { useAppSelector } from '@/store/hooks';
import moment from 'moment';

import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const DomainTable = () => {
    const filter = useAppSelector(state => state.domain.items.filter);
    const result = useAppSelector(state => state.domain.items.result);

    return (
        <TableContainer>
            <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ minWidth: 50 }}>ID</TableCell>
                        <TableCell style={{ minWidth: 100 }}>SMTP ホスト</TableCell>
                        <TableCell style={{ minWidth: 50 }}>SMTP ポート</TableCell>
                        <TableCell style={{ minWidth: 150 }}>メールアドレス</TableCell>
                        <TableCell style={{ minWidth: 100 }}>IMAP ホスト</TableCell>
                        <TableCell>登録日時</TableCell>
                        <TableCell style={{ minWidth: 100 }}>編集</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result.data.map(domain => {
                        return (
                            <TableRow hover role='checkbox' tabIndex={-1} key={domain.id}>
                                <TableCell>{domain.id}</TableCell>
                                <TableCell>{domain.host}</TableCell>
                                <TableCell>{domain.port}</TableCell>
                                <TableCell>{domain.username}</TableCell>
                                <TableCell>{domain.imap_host}</TableCell>
                                <TableCell>{moment(domain?.created_at).format('YYYY/MM/DD  HH:mm')}</TableCell>
                                <TableCell>
                                    <Link href={`/admin/domains/${domain.id}`} color='secondary'>
                                        編集
                                    </Link>
                                </TableCell>
                            </TableRow>
                        );
                    })}

                    {result.data.length === 0 && (
                        <TableRow className='h-[100px]'>
                            <TableCell colSpan={6} align='center'>
                                <div className='w-full flex flex-col items-center justify-center gap-3'>
                                    <FolderOpenIcon sx={{ fontSize: 100 }} className='text-[#697586]' />

                                    <p>
                                        該当するデータが見つかりませんでした。
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
    );
};

export default DomainTable;

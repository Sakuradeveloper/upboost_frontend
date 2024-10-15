import { useEffect, useState } from 'react';
import { postRequest } from '@/utils/axios';
import { ICsvCustomer } from '@/interfaces';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCustomers } from '@/store/features/customer';
import moment from 'moment';

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress,
    Typography
} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface Props {
    open: boolean;
    onClose: () => void;
    items: ICsvCustomer[];
}

const ImportCSVDialog = ({ open, onClose, items }: Props) => {
    const { user, setPending } = useAuth();
    const dispatch = useAppDispatch();

    const [data, setData] = useState<ICsvCustomer[]>([]);
    const [result, setResult] = useState<any[]>([]);
    const [doneCnt, setDoneCnt] = useState(0);
    const [step, setStep] = useState(0);

    const filter = useAppSelector(state => state.customer.items.filter);
    const shared_data = useAppSelector(state => state.shared_data);

    useEffect(() => {
        setData(items);
    }, [items]);

    useEffect(() => {
        if (!open) {
            setDoneCnt(0);
            setStep(0);
        }
    }, [open]);

    const handleUpload = async () => {
        setPending && setPending(true);
        setResult([]);

        // chunk 100 件ごとにデータを登録する
        let chunkSize = 100;
        let chunk = data.slice(0, chunkSize);
        let rest = data.slice(chunkSize);
        let cnt = 0;
        let temp_result: any[] = [];
        while (chunk.length > 0) {
            const res = await postRequest('v0/customers/batch_create', {
                data: chunk
            });
            if (res.status == 200) {
                temp_result = [...temp_result, ...res.data];

                cnt += chunk.length;
                setDoneCnt(cnt);
                chunk = rest.slice(0, chunkSize);
                rest = rest.slice(chunkSize);
            } else {
                break;
            }
        }

        setResult(temp_result);
        dispatch(fetchCustomers(filter));
        setStep(2);
        setPending && setPending(false);
    };

    const Step0 = (
        <div>
            <Typography variant='h3' sx={{ fontSize: 14, fontWeight: 500, mb: 3 }}>
                - プレビュー
            </Typography>

            <TableContainer>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>広告媒体</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>名前</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>電話番号</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>メールアドレス</TableCell>
                            {user?.role.role_id == 'admin' && (
                                <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>担当者</TableCell>
                            )}
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>入金日</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>契約開始日</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>契約日数</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>属性</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>ステータス</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>システム提供</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                                <TableCell>{row.ads}</TableCell>
                                <TableCell className=' whitespace-nowrap'>{row.name}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                {user?.role.role_id == 'admin' && (
                                    <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>
                                        {/* {row.manager || '' == '' ? user.user_info.name : row.manager} */}aaa
                                    </TableCell>
                                )}
                                <TableCell>
                                    {moment(row.deposit_date).isValid()
                                        ? moment(row.deposit_date).format('YYYY/MM/DD')
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {moment(row.contract_start_date).isValid()
                                        ? moment(row.contract_start_date).format('YYYY/MM/DD')
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {row.contract_days} {parseInt(row.contract_days) > 0 ? '日' : ''}
                                </TableCell>
                                <TableCell className='whitespace-nowrap'>
                                    {
                                        shared_data.property_data.find(
                                            item => item.property_type == row.property || item.name == row.property
                                        )?.name
                                    }
                                </TableCell>
                                <TableCell className='whitespace-nowrap'>
                                    {
                                        shared_data.status_data.find(
                                            item => item.status_type == row.status || item.name == row.status
                                        )?.name
                                    }
                                </TableCell>
                                <TableCell>{row.system_provided}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

    const Step1 = (
        <div className='w-full h-[150px] flex flex-col items-center justify-center'>
            <Typography variant='h3' sx={{ fontSize: 14, fontWeight: 500, mb: 3 }}>
                - データのアップロード中
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant='determinate' value={data.length > 0 ? (doneCnt * 100) / data.length : 0} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography variant='body2' color='text.secondary'>{`${Math.round(
                        data.length > 0 ? (doneCnt * 100) / data.length : 0
                    )}%`}</Typography>
                </Box>
            </Box>
        </div>
    );

    const Step2 = (
        <div>
            <Typography variant='h3' sx={{ fontSize: 14, fontWeight: 500 }}>
                - 結果
            </Typography>

            <p className='mt-3 px-2'>
                {data.length} 件中 {result.filter(it => it.status == 200).length} 件が登録されました。
            </p>

            <TableContainer>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>広告媒体</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>名前</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>電話番号</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>メールアドレス</TableCell>
                            {user?.role.role_id == 'admin' && (
                                <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>担当者</TableCell>
                            )}
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>入金日</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>契約開始日</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>契約日数</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>属性</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>ステータス</TableCell>
                            <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>システム提供</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result.map((row, index) => {
                            return (
                                <TableRow
                                    hover
                                    role='checkbox'
                                    tabIndex={-1}
                                    key={index}
                                    sx={{
                                        backgroundColor: row.status == 200 ? '#ccffcc' : '#ffcccc'
                                    }}
                                >
                                    <TableCell>{row.data.ads}</TableCell>
                                    <TableCell>{row.data.name}</TableCell>
                                    <TableCell>{row.data.phone}</TableCell>
                                    <TableCell>{row.data.email}</TableCell>
                                    {user?.role.role_id == 'admin' && (
                                        <TableCell style={{ minWidth: 100, whiteSpace: 'nowrap' }}>
                                            {row.data.manager?.name}
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        {row.data?.deposit_date
                                            ? moment(row.data?.deposit_date).format('YYYY/MM/DD')
                                            : ''}
                                    </TableCell>
                                    <TableCell>
                                        {row.data?.contract_start_date
                                            ? moment(row.data?.contract_start_date).format('YYYY/MM/DD')
                                            : ''}
                                    </TableCell>
                                    <TableCell>
                                        {row.data.contract_days} {parseInt(row.data.contract_days) > 0 ? '日' : ''}
                                    </TableCell>
                                    <TableCell className='whitespace-nowrap'>
                                        {
                                            shared_data.property_data.find(
                                                item =>
                                                    item.property_type == row.data.property ||
                                                    item.name == row.data.property
                                            )?.name
                                        }
                                    </TableCell>
                                    <TableCell className='whitespace-nowrap'>
                                        {
                                            shared_data.status_data.find(
                                                item =>
                                                    item.status_type == row.data.status || item.name == row.data.status
                                            )?.name
                                        }
                                    </TableCell>
                                    <TableCell>{row.data.system_provided}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='xl'>
            <DialogTitle sx={{ fontSize: 16, fontWeight: 700 }}>一括登録する</DialogTitle>
            <DialogContent>
                {step == 0 && Step0}
                {step == 1 && Step1}
                {step == 2 && Step2}
            </DialogContent>
            <DialogActions>
                {step == 0 && (
                    <Button autoFocus color='secondary' variant='contained' onClick={handleUpload}>
                        アップロード
                    </Button>
                )}
                <Button autoFocus color='secondary' variant='outlined' onClick={onClose}>
                    閉じる
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportCSVDialog;

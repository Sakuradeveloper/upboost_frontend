import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ICsvCustomer } from '@/interfaces';
import { getBlobRequest } from '@/utils/axios';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearFilter, setFilterValue } from '@/store/features/customer';
import * as XLSX from 'xlsx';
import FileDownload from 'js-file-download';

import { Button, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { IoSearch } from 'react-icons/io5';
import FormLabel from '@/components/atoms/FormLabel';
import CSV_Btn from '@/components/molecules/CSV_Btn';
import ImportCSVDialog from '../components/ImportCSVDialog';
import moment from 'moment';

const Filter = () => {
    const { setPending } = useAuth();
    const dispatch = useAppDispatch();

    const ref = useRef<HTMLInputElement | null>(null);
    const [currentDialog, setCurrentDialog] = useState<string>('');
    const [items, setItems] = useState<ICsvCustomer[]>([]);
    const [keyword, setKeyword] = useState('');
    const filter = useAppSelector(state => state.customer.items.filter);
    const shared_data = useAppSelector(state => state.shared_data);

    useEffect(() => {
        setKeyword(filter.keyword);
    }, [filter.keyword]);

    const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
        if (!(e.target.files && e.target.files.length > 0)) return;

        const file = e.target.files[0];
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = ev => {
                const bufferArray = ev?.target?.result;
                const wb = XLSX.read(bufferArray, {
                    type: 'buffer'
                });

                const sheet_names = wb.SheetNames;
                // let data: any = {};
                // sheet_names.forEach(sheet => {
                //     data[sheet] = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
                // });
                const data = XLSX.utils.sheet_to_json(wb.Sheets[sheet_names[0]]);
                resolve(data);
            };
            fileReader.onerror = error => {
                reject(error);
            };
        });
        promise.then((data: any) => {
            try {
                let result = data.map((item: any) => {
                    return {
                        name: item['氏名'] || null,
                        email: item['メールアドレス'] || null,
                        phone: item['電話番号'] || null,
                        email_2: item['メールアドレス2'] || null,
                        phone_2: item['電話番号2'] || null,
                        manager: item['担当者'] || null,
                        ads: item['広告媒体'] || null,
                        deposit_date: item['入金日'] || null,
                        contract_start_date: item['契約開始日'] || null,
                        contract_days: item['契約日数'] || null,
                        property: item['属性'] || null,
                        status: item['ステータス'] || null,
                        system_provided: item['システム提供'] || 'NG'
                    };
                });
                setItems(result);
                setCurrentDialog('import');
            } catch (error) {
                alert('エラーが発生しました。');
                setItems([]);
            }
        });
    };

    const handleExport = async () => {
        setPending && setPending(true);
        const res = await getBlobRequest('v0/customers/download');
        if (res.status == 200) {
            FileDownload(res.data, `顧客一覧_${moment().format('YYYYMMDDHHmmss')}.xlsx`);
        }

        setPending && setPending(false);
    };

    return (
        <div className='w-full flex flex-col-reverse xl:flex-row items-end xl:items-center justify-between gap-[16px] mb-[16px]'>
            <div className='w-full flex flex-col xl:flex-row items-center gap-[20px]'>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        dispatch(setFilterValue({ keyword: keyword }));
                    }}
                    className='w-full xl:max-w-[320px] flex'
                >
                    <TextField
                        fullWidth
                        size='small'
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <IoSearch />
                                </InputAdornment>
                            )
                        }}
                        placeholder='検索ワードを入力'
                    />
                </form>
                <div className='w-full flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                    <FormLabel className='min-w-[54px] mt-[10px]'>状態</FormLabel>
                    <div className='w-full xl:max-w-[420px]'>
                        <Select
                            fullWidth
                            size='small'
                            value={filter.status}
                            onChange={e => dispatch(setFilterValue({ status: e.target.value }))}
                        >
                            <MenuItem value={0}>選択する</MenuItem>
                            {shared_data.status_data.map(status => (
                                <MenuItem value={status.id} key={status.id}>
                                    {status.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
                {/* ************************************************************************ */}
                <div className='w-full flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                    <FormLabel className='min-w-[54px] mt-[10px]'>属性</FormLabel>
                    <div className='w-full xl:max-w-[420px]'>
                        <Select
                            fullWidth
                            size='small'
                            value={filter.property}
                            onChange={e => dispatch(setFilterValue({ property: e.target.value }))}
                        >
                            <MenuItem value={0}>選択する</MenuItem>
                            {shared_data.property_data.map(property => (
                                <MenuItem value={property.id} key={property.id}>
                                    {property.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>

                <Button
                    variant='contained'
                    fullWidth
                    color='primary'
                    size='small'
                    onClick={() => dispatch(clearFilter())}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        px: 3,
                        whiteSpace: 'nowrap',
                        maxWidth: 150
                    }}
                >
                    検索条件クリア
                </Button>
            </div>

            <div className='flex items-center'>
                <CSV_Btn onExport={handleExport} onImport={() => ref.current?.click()} />
                <input type='file' ref={ref} className='hidden' value='' onChange={handleImport} />
            </div>

            <ImportCSVDialog open={currentDialog == 'import'} onClose={() => setCurrentDialog('')} items={items} />
        </div>
    );
};

export default Filter;

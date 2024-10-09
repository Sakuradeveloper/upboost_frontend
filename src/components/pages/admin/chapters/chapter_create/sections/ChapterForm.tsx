import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { setCurrentItemValue } from '@/store/features/customer';
import { fetchPropertyData, fetchStatusData } from '@/store/features/shared_data';

import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Switch, TextField, Typography, SelectChangeEvent } from '@mui/material';
import FormLabel from '@/components/atoms/FormLabel';
import { clearCurrentItem, setCurrentItem, setCurrentItemValue, setError } from '@/store/features/subject';
import { postRequest } from '@/utils/axios';

const ChapterForm = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.subject.item.form);
    const errors = useAppSelector(state => state.customer.item.errors);
    const shared_data = useAppSelector(state => state.shared_data);

    const handleSave = async() => {
        // Save logic 
        const res = await postRequest(`/v0/admin/subject/`, currentItem);
        if (res.status == 200) {
            dispatch(clearCurrentItem());
        }

        if (res.status == 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }
    };

    const handleCancel = () => {
        console.log('Cancel clicked');
        dispatch(clearCurrentItem());
    };

    return (
        <>
            <Container maxWidth="sm" sx={{ mt: 4}}>
                <Typography variant="h4" gutterBottom sx={{mb:2}}>
                    教科書編集
                </Typography>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Language Selector */}
                    <FormControl fullWidth >
                    <InputLabel id="language-select-label">言語選択</InputLabel>
                    <Select
                        labelId="language-select-label"
                        id="language-select"
                        value={currentItem.type}
                        label="言語選択"
                        onChange={(e)=>dispatch(setCurrentItemValue({type:e.target.value}))}
                    >
                        <MenuItem value="northern">標準語(北部弁)</MenuItem>
                        <MenuItem value="southern">南部弁</MenuItem>
                        <MenuItem value="central">中部弁</MenuItem>
                    </Select>
                    </FormControl>

                    {/* Level Selector */}
                    <FormControl fullWidth>
                    <InputLabel id="level-select-label">レベル選択</InputLabel>
                    <Select
                        labelId="level-select-label"
                        id="level-select"
                        value={currentItem.level}
                        label="レベル選択"
                        onChange={(e)=>dispatch(setCurrentItemValue({level:e.target.value}))}
                    >
                        <MenuItem value="beginner">初心者向け</MenuItem>
                        <MenuItem value="intermediate">中級者向け</MenuItem>
                    </Select>
                    </FormControl>

                    {/* Order Input */}
                    <TextField
                    fullWidth
                    label="章入力"
                    type="number"
                    value={currentItem.order}
                    onChange={(e)=>dispatch(setCurrentItemValue({order:e.target.value}))}
                    InputProps={{ inputProps: { min: 0 } }}
                    />

                    {/* Title Input */}
                    <TextField
                    fullWidth
                    label="タイトル"
                    value={currentItem.title}
                    onChange={(e)=>dispatch(setCurrentItemValue({title:e.target.value}))}
                    />

                    {/* Description Input */}
                    <TextField
                    fullWidth
                    label="説明"
                    multiline
                    rows={4}
                    value={currentItem.description}
                    onChange={(e)=>dispatch(setCurrentItemValue({description:e.target.value}))}
                    />

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button variant="contained" color="secondary" onClick={handleCancel}>
                        キャンセル
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        保管
                    </Button>
                    </Box>
                </Box>
                </Container>
        </>
    );
};

export default ChapterForm;

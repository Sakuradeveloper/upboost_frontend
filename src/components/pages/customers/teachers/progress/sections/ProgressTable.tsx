import React, { useEffect, useMemo, useState } from 'react'; // Assuming this is the file where you put your API request
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Typography, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteRequest, patchRequest, postRequest } from '@/utils/axios';
import { appendMessage } from '@/store/features/utils';
import { setError } from '@/store/features/login';
import { fetchProgress } from '@/store/features/progress';

interface LectureProgress {
    id: number;
    chapter: number;
    progress: number;
    teacher: number;
    student: number;
    created_at: string;
    updated_at: string;
    chapterInfo?: {
        id: number;
        title: string;
        description: string;
        order: number;
        subject: number;
    };
    subject_id?:number;
    chapter_id?:number;
}

const ProgressTable: React.FC<{teacherId: string |null; studentId: string |null}> = ({ teacherId, studentId }) => {
    // const [progressList, setProgressList] = useState<LectureProgress[]>([]);
    const dispatch = useAppDispatch();

    const arg = useMemo(()=>{
        return {teacher:teacherId, student:studentId}
    },[teacherId, studentId])

    const result = useAppSelector(state => state.progress.items.result);
    const subjects = useAppSelector(state => state.subject.items.result.data);
    const subjectID = result?.data[0]?.chapterInfo.subject;
    const subject = subjects.reduce((single, item)=>{
        if(item.id == subjectID) single = item
        return single
    }, {})
    console.log(subject, "????????????????>>>>>>>>>>>>>>>>>>>>>>")
    console.log(result?.data[0]?.chapterInfo.subject, "!!!!!!!!!!!!!!<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>")
    // const subject_id = result.data[0].chapterInfo.subject;

    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [progressToDelete, setProgressToDelete] = useState<any>(null);
    const [editProgress, setEditProgress] = useState<Partial<LectureProgress>>({
        chapter: 0,
        progress: 0,
        teacher: Number(teacherId),
        student: Number(studentId),
        chapterInfo: {
            id: 0,
            title: '',
            description: '',
            order: 0,
            subject: 0,
        },
    });

    const openEditModel = (chapter: any) => {
        setEditProgress(chapter);
        setOpenEdit(true);
    };

    const openCreateModel = () => {
        setEditProgress({ });
        setOpenCreate(true);
    };

    const onCreateSubmit = async () => {
        const res = await postRequest('/v0/teacher/progress/', editProgress);
        if (res.status === 201) {
            setEditProgress({ });
            dispatch(appendMessage({ type: 'success', message: 'Chapter created successfully!' }));
            // dispatch(fetchSubjects());
            setOpenCreate(false);
        } else if (res.status === 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }
    };

    const onEditSubmit = async () => {
        const res = await patchRequest(`/v0/teacher/progress/${editProgress.id}`, editProgress);
        if (res.status === 200) {
            setEditProgress({ });
            dispatch(fetchProgress(arg))
            dispatch(appendMessage({ type: 'success', message: 'Chapter updated successfully!' }));
            // dispatch(fetchSubjects());
            
            setOpenEdit(false);
        } else if (res.status === 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }
    };

    const onDeleteSubmit = async () => {
        const res = await deleteRequest(`/v0/teacher/progress/${editProgress.id}`, {});
        if (res.status === 204) {
            dispatch(appendMessage({ type: 'success', message: 'Chapter deleted successfully!' }));
            // dispatch(fetchSubjects());
            setOpenDelete(false);
        } else {
            dispatch(appendMessage({ type: 'error', message: 'Failed to delete chapter.' }));
        }
    };

    const openDeleteModel = (progress: any) => {
        setProgressToDelete(progress);
        setOpenDelete(true);
    };

    return (
        <>
            <Button variant="contained" color="secondary" onClick={openCreateModel} sx={{ mb: 2 }}>
                章を作成
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>章</TableCell>
                            <TableCell>タイトル</TableCell>
                            <TableCell>説明</TableCell>
                            <TableCell>進捗状況 (%)</TableCell>
                            {/* <TableCell>授業日</TableCell> */}
                            <TableCell style={{ minWidth: 150 }}>編集/削除</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result.data.map((progress) => (
                            <TableRow key={progress.id}>
                                <TableCell>{progress.chapterInfo.order}</TableCell>
                                <TableCell>{progress.chapterInfo.title}</TableCell>
                                <TableCell>{progress.chapterInfo.description}</TableCell>
                                <TableCell>{progress.progress}%</TableCell>
                                {/* <TableCell>{new Date(progress.created_at).toLocaleString()}</TableCell> */}
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => openEditModel(progress)}
                                    >
                                        編集
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => openDeleteModel(progress)}
                                    >
                                        削除
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Dialog */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
                <DialogTitle sx={{ paddingBottom: 2, fontSize: 22 }}>章の編集</DialogTitle>
                <DialogContent>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: 14, fontWeight: 'bold', mb: 0.5 }}>章</Typography>
                        <Typography variant="h6" color="textPrimary" sx={{ fontSize: 20, fontWeight: 500 }}>{editProgress.chapterInfo?.order || 'N/A'}</Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: 14, fontWeight: 'bold', mb: 0.5 }}>タイトル</Typography>
                        <Typography variant="h6" color="textPrimary" sx={{ fontSize: 20, fontWeight: 500 }}>{editProgress.chapterInfo?.title || 'N/A'}</Typography>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: 14, fontWeight: 'bold', mb: 0.5 }}>説明</Typography>
                        <Typography variant="body1" color="textPrimary" sx={{ fontSize: 16, lineHeight: 1.5 }}>
                            {editProgress.chapterInfo?.description || 'N/A'}
                        </Typography>
                    </Box>

                    <TextField
                        fullWidth
                        label="進捗状況 (%)"
                        type="number"
                        value={editProgress.progress}
                        onChange={(e) => setEditProgress({ ...editProgress, progress: Number(e.target.value) })}
                        sx={{ 
                            mb: 4,
                            fontSize: 16,
                            backgroundColor: '#F5F5F5',
                            borderRadius: '10px',
                            '& .MuiInputBase-root': {
                                borderRadius: '10px',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#E0E0E0',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#C0C0C0',
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ paddingX: 3, paddingY: 2 }}>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={onEditSubmit}
                        >
                        保存
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="error" 
                        onClick={() => setOpenEdit(false)}
                        >
                        キャンセル
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Create Dialog */}
            <Dialog open={openCreate} onClose={() => setOpenCreate(false)} fullWidth maxWidth="sm" sx={{p:4}}>
                <DialogTitle sx={{ fontSize: 20, fontWeight: 'bold'}}>章の作成</DialogTitle>
                <DialogContent sx={{ mt: 2, p:2 }}>
                    {/* Chapter Selection */}
                    <FormControl fullWidth sx={{ mb: 3, mt:3 }}>
                        <InputLabel id="chapter-select-label">章の選択</InputLabel>
                        <Select
                            labelId="chapter-select-label"
                            fullWidth
                            size="small"
                            value={editProgress.chapter_id || ''}
                            onChange={(e) =>
                                setEditProgress({
                                    ...editProgress,
                                    subject_id: subjectID,
                                    chapter_id: e.target.value as number,
                                })
                            }
                            label="章の選択"
                        >
                            {subject.chapters?.map((chapter: { id: number; order: number; title: string }) => (
                                <MenuItem value={chapter.id} key={chapter.id}>
                                    第{chapter.order}章 {chapter.title}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>選択した章を指定してください</FormHelperText>
                    </FormControl>

                    {/* Progress Input */}
                    <TextField
                        fullWidth
                        label="進捗状況 (%)"
                        type="number"
                        value={editProgress.progress}
                        onChange={(e) => setEditProgress({ ...editProgress, progress: Number(e.target.value) })}
                        sx={{
                            mb: 3,
                            backgroundColor: '#F5F5F5',
                            borderRadius: '8px',
                            '& .MuiInputBase-root': {
                                borderRadius: '8px',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#E0E0E0',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#C0C0C0',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#6200EA',
                            },
                        }}
                    />
                </DialogContent>

                <DialogActions sx={{ padding: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onCreateSubmit}
                        sx={{
                            backgroundColor: '#6200EA',
                            color: '#fff',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            px: 4,
                            py: 1.5,
                            '&:hover': {
                                backgroundColor: '#4B00B3',
                            },
                        }}
                    >
                        作成
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setOpenCreate(false)}
                        sx={{
                            borderColor: '#4B00B3',
                            color: '#4B00B3',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            px: 4,
                            py: 1.5,
                            '&:hover': {
                                backgroundColor: '#EFEFEF',
                            },
                        }}
                    >
                        キャンセル
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)} fullWidth maxWidth="xs">
                <DialogTitle>章の削除</DialogTitle>
                <DialogContent>この章を削除してもよろしいですか？</DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={onDeleteSubmit}>
                        削除
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => setOpenDelete(false)}>
                        キャンセル
                    </Button>
                </DialogActions>
            </Dialog>
        </>
        
    );
};

export default ProgressTable;
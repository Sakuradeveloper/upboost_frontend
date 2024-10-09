import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { setCurrentItemValue } from '@/store/features/customer';
import { fetchPropertyData, fetchStatusData } from '@/store/features/shared_data';

import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Switch, TextField, Typography, SelectChangeEvent, Grid, Card, CardMedia, CardContent, Link,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,  Dialog, DialogActions, DialogContent, DialogTitle  } from '@mui/material';
import FormLabel from '@/components/atoms/FormLabel';
import { clearCurrentItem, fetchSubjects, setCurrentItem, setCurrentItemValue, setError } from '@/store/features/subject';
import { deleteRequest, patchRequest, postRequest } from '@/utils/axios';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { appendMessage } from '@/store/features/utils';

interface ChapterList {
    id: string|null;
}

const ChapterList: React.FC<ChapterList> = ({ id }) => {
    const dispatch = useAppDispatch();
    const compareLocation = (location: string) =>
        location === 'northern' ? '標準語(北部弁)' : location === 'southern' ? '南部弁' : '中部弁';
    const compareLevel = (level: string) => (level === 'beginner' ? '初心者向け' : '中級者向け');

    const result = useAppSelector((state) => state.subject.items.result);
    const chapters = result.data.reduce((total, item) => {
        if (item.id == id) total = item;
        return total;
    }, { init: '' });

    const [openEdit, setOpenEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [editChapter, setEditChapter] = useState({ title: '', order: 0, description: '', id:0 });
    const [chapterToDelete, setChapterToDelete] = useState<any>(null);

    const openEditModel = (chapter: any) => {
        setEditChapter(chapter);
        setOpenEdit(true);
    };

    const openCreateModel = () => {
        setEditChapter({ title: '', order: 0, description: '', id:0 });
        setOpenCreate(true);
    };

    const openDeleteModel = (chapter: any) => {
        setChapterToDelete(chapter);
        setOpenDelete(true);
    };

    const onEditSubmit = async () => {
        const res = await patchRequest(`/v0/admin/chapters/${editChapter.id}`, editChapter);
        if (res.status === 200) {
            setEditChapter({ title: '', order: 0, description: '', id:0 });
            dispatch(appendMessage({ type: 'success', message: '章が正常に更新されました!' }));
            dispatch(fetchSubjects());
            setOpenEdit(false);
        } else if (res.status === 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }
    };

    const onCreateSubmit = async () => {
        const res = await postRequest('/v0/admin/chapters/', { ...editChapter, subject_id: chapters.id });
        if (res.status === 201) {
            setEditChapter({ title: '', order: 0, description: '', id:0 });
            dispatch(appendMessage({ type: 'success', message: '章が正常に作成されました!' }));
            dispatch(fetchSubjects());
            setOpenCreate(false);
        } else if (res.status === 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }
    };

    const onDeleteSubmit = async () => {
        const res = await deleteRequest(`/v0/admin/chapters/${chapterToDelete.id}`, {});
        if (res.status === 204) {
            dispatch(appendMessage({ type: 'success', message: '章が正常に削除されました。' }));
            dispatch(fetchSubjects());
            setOpenDelete(false);
        } else {
            dispatch(appendMessage({ type: 'error', message: '章の削除に失敗しました。' }));
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={openCreateModel} sx={{ mb: 2 }}>
                章を作成
            </Button>

            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: 50 }}>章</TableCell>
                            <TableCell style={{ minWidth: 100 }}>タイトル</TableCell>
                            <TableCell>説明</TableCell>
                            <TableCell style={{ minWidth: 150 }}>編集/削除</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {chapters?.chapters?.map((chapter: any) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={chapter.id}>
                                    <TableCell>{chapter.order}</TableCell>
                                    <TableCell>{chapter.title}</TableCell>
                                    <TableCell>{chapter.description}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => openEditModel(chapter)}
                                        >
                                            編集
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => openDeleteModel(chapter)}
                                        >
                                            削除
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}

                        {result.data.length === 0 && (
                            <TableRow className="h-[100px]">
                                <TableCell colSpan={8} align="center">
                                    <div className="w-full flex flex-col items-center justify-center gap-3">
                                        <FolderOpenIcon sx={{ fontSize: 100 }} className="text-[#697586]" />
                                        <p>該当するデータが見つかりませんでした。</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Dialog */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm" sx={{p:4}}>
                <DialogTitle sx={{fontSize:16}}>章の編集</DialogTitle>
                <DialogContent sx={{p:4, mb:2}}>
                    <TextField
                        fullWidth
                        label="章"
                        value={editChapter.order || ''}
                        onChange={(e) => setEditChapter((prevState) => ({ ...prevState, order: parseInt(e.target.value, 10) }))}
                        sx={{ mb: 2, mt:2 }}
                    />
                    <TextField
                        fullWidth
                        label="タイトル"
                        value={editChapter.title || ''}
                        onChange={(e) => setEditChapter((prevState) => ({ ...prevState, title: e.target.value }))}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="説明"
                        value={editChapter.description || ''}
                        onChange={(e) => setEditChapter((prevState) => ({ ...prevState, description: e.target.value }))}
                        multiline
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={onEditSubmit}>
                        保存
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => setOpenEdit(false)}>
                        キャンセル
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Create Dialog */}
            <Dialog open={openCreate} onClose={() => setOpenCreate(false)} fullWidth maxWidth="sm">
                <DialogTitle sx={{fontSize:16}}>章の作成</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="章"
                        value={editChapter.order || ''}
                        onChange={(e) => setEditChapter((prevState) => ({ ...prevState, order: parseInt(e.target.value, 10) }))}
                        sx={{ mb: 2, mt:2 }}
                    />
                    <TextField
                        fullWidth
                        label="タイトル"
                        value={editChapter.title || ''}
                        onChange={(e) => setEditChapter((prevState) => ({ ...prevState, title: e.target.value }))}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="説明"
                        value={editChapter.description || ''}
                        onChange={(e) => setEditChapter((prevState) => ({ ...prevState, description: e.target.value }))}
                        multiline
                        rows={4}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="secondary" onClick={onCreateSubmit}>
                        作成
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => setOpenCreate(false)}>
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


export default ChapterList;

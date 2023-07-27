import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

export interface Comment {
  author: string;
  text: string;
  createdDate: string;
}

export interface CommentState {
  isLoading: boolean;
  commentList: Comment[];
}

const initialState: CommentState = {
  isLoading: false,
  commentList: [
    {
      author: 'Buddha',
      text: 'Three things cannot be long hidden: the sun, the moon, and the truth.',
      createdDate: '631231860000',
    },
    {
      author: 'Albert Einstein',
      text: 'Imagination is more important than knowledge.',
      createdDate: '-980941020000',
    },
    {
      author: 'Stephen Hawking',
      text: 'Intelligence is the ability to adapt to change.',
      createdDate: '664236660000',
    },
  ],
};

export const getCommentList = createAsyncThunk(
  'comment/fetchCommentList',
  async () => {
    const res = await fetch('http://localhost:8888/comments');
    return await res.json();
  },
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.commentList = action.payload;
    },
    addComment: (state, action) => {
      state.commentList = [...state.commentList, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCommentList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCommentList.fulfilled, (state, action) => {
      state.commentList = action.payload;
    });
    builder.addCase(getCommentList.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { addComment, setComments } = commentSlice.actions;

export const selectCommentList = (state: RootState) =>
  state.comment.commentList;

export default commentSlice.reducer;

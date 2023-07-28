import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

export interface Comment {
  author: string;
  text: string;
  createdDate: string;
}

export interface CommentState {
  isLoading: boolean;
  error: {
    code: number;
    message: string;
  } | null;
  commentList: Comment[];
}

const initialState: CommentState = {
  isLoading: false,
  error: null,
  commentList: [
    // {
    //   author: 'Buddha',
    //   text: 'Three things cannot be long hidden: the sun, the moon, and the truth.',
    //   createdDate: '631231860000',
    // },
    // {
    //   author: 'Albert Einstein',
    //   text: 'Imagination is more important than knowledge.',
    //   createdDate: '-980941020000',
    // },
    // {
    //   author: 'Stephen Hawking',
    //   text: 'Intelligence is the ability to adapt to change.',
    //   createdDate: '664236660000',
    // },
  ],
};

export const getCommentList = createAsyncThunk<
  Comment[],
  void,
  {
    rejectValue: {
      code: number;
      message: string;
    };
  }
>('comment/fetchCommentList', async (_, { rejectWithValue }) => {
  return await fetch('http://localhost:8888/comments')
    .then((res) => res.json())
    .catch((error) => {
      rejectWithValue({
        code: error.code,
        message: error.message,
      });
    });
});

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
      state.error = null;
      state.commentList = initialState.commentList;
    });
    builder.addCase(
      getCommentList.fulfilled,
      (state, action: PayloadAction<Comment[]>) => {
        if (action.payload.length) state.commentList = action.payload;
      },
    );
    builder.addCase(getCommentList.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? null;
    });
  },
});

export const { addComment, setComments } = commentSlice.actions;

export const selectCommentList = (state: RootState) =>
  state.comment.commentList;

export default commentSlice.reducer;

import commentReducer, {
  addComment,
  CommentState,
  setComments,
} from './commentSlice';

describe('comment reducer', () => {
  const initialState: CommentState = {
    isLoading: false,
    commentList: [],
  };

  it('should handle initial state', () => {
    expect(commentReducer(initialState, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should handle add comment', () => {
    const actual = commentReducer(
      initialState,
      addComment({
        author: 'Buddha',
        text: 'Three things cannot be long hidden: the sun, the moon, and the truth.',
        createdDate: '631231860000',
      }),
    );
    expect(actual.commentList).toEqual([
      {
        author: 'Buddha',
        text: 'Three things cannot be long hidden: the sun, the moon, and the truth.',
        createdDate: '631231860000',
      },
    ]);
  });

  it('should handle set comments', () => {
    const actual = commentReducer(
      initialState,
      setComments([
        {
          author: 'Buddha',
          text: 'Three things cannot be long hidden: the sun, the moon, and the truth.',
          createdDate: '631231860000',
        },
      ]),
    );
    expect(actual.commentList).toEqual([
      {
        author: 'Buddha',
        text: 'Three things cannot be long hidden: the sun, the moon, and the truth.',
        createdDate: '631231860000',
      },
    ]);
  });
});

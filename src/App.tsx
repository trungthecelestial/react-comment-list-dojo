import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  addComment,
  getCommentList,
  selectCommentList,
} from './features/comment/commentSlice';

function App() {
  const dispatch = useAppDispatch();
  const commentList = useAppSelector(selectCommentList);

  const [comment, setComment] = useState('');

  // useEffect(() => {
  //   dispatch(getCommentList());
  // }, [dispatch]);

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col p-4">
      <div className="flex flex-col gap-4">
        {commentList.map((comment) => (
          <div key={comment.createdDate} className="rounded border p-4">
            <div className="font-bold">{comment.text}</div>
            <div className="mt-4 inline-flex justify-between w-full">
              <div className="text-sm">
                {new Date(Number(comment.createdDate)).toLocaleDateString()}
              </div>
              <div className="text-sm italic">{comment.author}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <input
          className="w-full px-4 py-2 text-black"
          placeholder="Type your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              dispatch(
                addComment({
                  author: 'Trung', // Should be the current user
                  text: comment,
                  createdDate: Date.now(),
                }),
              );
            } else if (event.key === 'Escape') {
              setComment('');
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;

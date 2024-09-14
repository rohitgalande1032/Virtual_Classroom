import React, { useState, useEffect } from 'react';
import { getComments, postComment } from '../services/api';

const Comment = ({ sessionId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(sessionId);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [sessionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postComment({ content: newComment, session: sessionId });
      setNewComment('');
      // Fetch updated comments
      const response = await getComments(sessionId);
      setComments(response.data);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Comment;

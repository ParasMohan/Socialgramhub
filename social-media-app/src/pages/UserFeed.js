import React, { useState } from 'react';
import { users } from '../backend/db/users';
import { posts } from '../backend/db/posts';
import './UserFeed.css';

const UserFeed = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);

  const handleLikeToggle = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const handleBookmarkToggle = (postId) => {
    if (bookmarkedPosts.includes(postId)) {
      setBookmarkedPosts(bookmarkedPosts.filter(id => id !== postId));
    } else {
      setBookmarkedPosts([...bookmarkedPosts, postId]);
    }
  };

  const handleCommentToggle = (postId) => {
    setExpandedPostId(postId === expandedPostId ? null : postId);
  };

  const isPostLiked = (postId) => {
    return likedPosts.includes(postId);
  };

  const isPostBookmarked = (postId) => {
    return bookmarkedPosts.includes(postId);
  };

  return (
    <div className="feed-container">
      {users.map((user) => (
        <div className="user-card" key={user._id}>
          <img className="user-avatar" src={user.profileAvatar} alt={`${user.firstName} ${user.lastName} Avatar`} />
          <div className="user-info">
            <span className="user-name">{`${user.firstName} ${user.lastName}`}</span>
            {posts.map((post) => {
              if (post.username === user.username) {
                const isLiked = isPostLiked(post._id);
                const isBookmarked = isPostBookmarked(post._id);
                const isExpanded = expandedPostId === post._id;

                return (
                  <div className="post" key={post._id}>
                    {post.mediaURL && <img className="post-media" src={post.mediaURL} alt="Post Media" />}
                    <p className="post-content">{post.content}</p>
                    <div className="post-buttons">
                      <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={() => handleLikeToggle(post._id)}>
                        {isLiked ? 'Liked' : 'Like'}
                      </button>
                      <button className="comment-button" onClick={() => handleCommentToggle(post._id)}>
                        {isExpanded ? 'Hide Comments' : 'Comment'}
                      </button>
                      <button className="share-button">Share</button>
                      <button className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`} onClick={() => handleBookmarkToggle(post._id)}>
                        {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                      </button>
                    </div>
                    {isExpanded && (
                      <div className="comments">
                        {post.comments.map((comment) => (
                          <div className="comment" key={comment._id}>
                            <span className="comment-username">{comment.username}:</span>
                            <p className="comment-text">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserFeed;

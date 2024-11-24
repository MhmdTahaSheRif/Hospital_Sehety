import React, { useState } from 'react';
import aboutImg from '../images/about-img.jpg'; // Image for the post
import HeaderSection from './HeaderSection';
import profilePic from '../images/download.jpg'; // Profile picture

const AboutSection = ({ showHeader = true }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'Mhmd Taha',
      profilePic: profilePic,
      content: 'حاسس بان جسمي متكسر ماذا افعل ؟',
      likes: 5,
      comments: [
        { author: 'دكتور هشام', text: 'حقنه ديكسا' },
        { author: 'دكتوره مروه', text: 'حقنه دكلوفين' },
      ],
    },
    {
      id: 2,
      username: 'Hossam',
      profilePic: profilePic,
      content: 'حاسس بان عندي صداع شديد',
      likes: 8,
      comments: [
        { author: 'دكتور ممدوح', text: 'تناول اقراص البنادول' },
      ],
    },
  ]);

  const handleLike = (postId) => {
    setPosts(posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleAddComment = (postId, commentText) => {
    if (commentText.trim()) {
      setPosts(posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, { author: 'You', text: commentText }],
            }
          : post
      ));
    }
  };

  const handlePostSubmit = () => {
    if (newPostContent.trim() === '') return;
    const newPost = {
      id: posts.length + 1,
      username: 'You',
      profilePic: profilePic,
      content: newPostContent,
      likes: 0,
      comments: [],
      image: newPostImage || aboutImg,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostImage(null);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7fb', margin: 0, padding: 0 }}>
      <HeaderSection isLoggedIn={isLoggedIn} />
      <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '40px' }}>

        {/* New Post Section */}
        <div style={{
          backgroundColor: 'white', padding: '25px', marginBottom: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease'
        }}>
          <h3 style={{ color: '#0073b1', fontWeight: '600', marginBottom: '15px', fontSize: '1.5em' }}>Create a New Post</h3>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind?"
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '1.2em',
              borderRadius: '10px',
              border: '1px solid #ddd',
              marginBottom: '15px',
              minHeight: '120px',
              fontFamily: 'Arial, sans-serif',
              transition: 'all 0.3s ease',
            }}
          />
          {/* Image Upload */}
          <input
            type="file"
            onChange={(e) => setNewPostImage(URL.createObjectURL(e.target.files[0]))}
            style={{ marginBottom: '15px', fontSize: '1.1em', padding: '8px' }}
          />
          <button
            onClick={handlePostSubmit}
            style={{
              backgroundColor: '#0073b1',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              padding: '12px 25px',
              cursor: 'pointer',
              fontSize: '1.2em',
              transition: 'background-color 0.3s ease',
            }}
          >
            Post
          </button>
        </div>

        {/* Display Existing Posts */}
        <div style={{ marginTop: '20px' }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                marginBottom: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
              }}
            >
              {/* User Profile Section */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img
                  src={post.profilePic}
                  alt="Profile"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    marginRight: '15px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <span style={{ fontWeight: '700', fontSize: '1.3em', color: '#0073b1' }}>{post.username}</span>
              </div>

              {/* Post Content */}
              <p style={{ fontSize: '1.2em', margin: '20px 0', lineHeight: '1.6' }}>{post.content}</p>

      

              {/* Like Button */}
              <div
                style={{
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
            
              </div>

              {/* Comment Section */}
              <div
                style={{
                  marginTop: '20px',
                  borderTop: '1px solid #ddd',
                  paddingTop: '15px',
                }}
              >
                <h4 style={{ color: '#0073b1', fontWeight: '600', marginBottom: '10px' }}>Comments</h4>
                {post.comments.map((comment, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: '#f4f7fb',
                      padding: '12px',
                      marginTop: '12px',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <p style={{ margin: 0 }}>
                      <strong>{comment.author}:</strong> {comment.text}
                    </p>
                  </div>
                ))}

                {/* Add Comment Input */}
                <div style={{ marginTop: '12px' }}>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    id={`comment-input-${post.id}`}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '1.1em',
                      borderRadius: '10px',
                      border: '1px solid #ddd',
                      marginBottom: '10px',
                      transition: 'all 0.3s ease',
                    }}
                  />    <button
                  onClick={() => handleLike(post.id)}
                  style={{
                    backgroundColor: '#0073b1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '8px 20px',
                    cursor: 'pointer',
                    fontSize: '1.2em',
                    transition: 'all 0.3s ease',
                    margin:'5px'
                  }}
                >
                  👍 {post.likes} Likes
                </button>
                  <button
                    onClick={() => {
                      const inputField = document.getElementById(`comment-input-${post.id}`);
                      handleAddComment(post.id, inputField.value);
                      inputField.value = ''; // Clear the input after comment is added
                    }}
                    style={{
                      backgroundColor: '#0073b1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '8px 15px',
                      cursor: 'pointer',
                      fontSize: '1.2em',
                      marginTop: '6px',
                    }}
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

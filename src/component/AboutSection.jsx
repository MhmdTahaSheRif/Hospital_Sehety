import React, { useState } from 'react';
import aboutImg from '../images/about-img.jpg'; // Image for the post
import HeaderSection from './HeaderSection';
import profilePic from '../images/download.jpg'; // Profile picture
import commentIcon from '../images/comment.png'; // Comment icon image
import likeIcon from '../images/thumb-up.png'; // Like icon image
import angryIcon from '../images/angry.png'; // Angry icon image
import sadIcon from '../images/sad-face.png'; // Sad icon image
import loveIcon from '../images/heart.png'; // Sad icon image
import Repost from '../images/refreshing.png'; // Repost icon image
import Upload from '../images/upload-big-arrow.png'; // Upload icon image
import Footer from '../component/Footer'; // Upload icon image

const AboutSection = ({ showHeader = true }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'Mhmd Taha',
      profilePic: profilePic,
      title: 'Software Engineer',
      location: 'Cairo',
      content: 'حاسس بصداع شديد ممكن دكتور يفيدني لو سمحتم',
      likes: 30,
      comments: [
        { author: 'دكتور هشام', text: 'حقنه ديكسا' },
        { author: 'دكتوره مروه', text: 'حقنه دكلوفين' },
      ],
      hashtags: [],
      liked: false,
      reaction: null, // Added for reaction tracking
    },
  ]);

  const [showReactionOptions, setShowReactionOptions] = useState(null); // Track which post's reaction options are shown
  const [reaction, setReaction] = useState({}); // Track user reactions for posts
  const [newCommentText, setNewCommentText] = useState(''); // Track the new comment text input

  const handleLike = (postId) => {
    setPosts(posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + (post.liked ? -1 : 1), liked: !post.liked } : post
    ));
  };

  const handleAddComment = (postId) => {
    if (newCommentText.trim()) {
      setPosts(posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, { author: 'You', text: newCommentText }],
            }
          : post
      ));
      setNewCommentText(''); // Clear the comment input field after submission
    }
  };

  const handlePostSubmit = () => {
    if (newPostContent.trim() === '') return;
    const newPost = {
      id: posts.length + 1,
      username: 'You',
      profilePic: profilePic,
      title: 'Software Engineer',
      location: 'cairo',
      content: newPostContent,
      likes: 0,
      comments: [],
      hashtags: [],
      image: newPostImage || aboutImg,
      reaction: null, // Set reaction to null initially
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostImage(null);
  };

  const handleReaction = (postId, reactionType) => {
    setReaction((prev) => ({
      ...prev,
      [postId]: reactionType,
    }));
    setPosts(posts.map((post) =>
      post.id === postId ? { ...post, reaction: reactionType } : post
    ));
    setShowReactionOptions(null); // Hide the options after selecting
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f7fb', margin: 0, padding: 0 }}>
      <HeaderSection isLoggedIn={isLoggedIn} />
      <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '40px' }}>

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
              width: '100%', padding: '15px', fontSize: '1.2em', borderRadius: '10px', border: '1px solid #ddd', marginBottom: '15px', minHeight: '120px', fontFamily: 'Arial, sans-serif', transition: 'all 0.3s ease'
            }}
          />
          <button
            onClick={handlePostSubmit}
            style={{
              backgroundColor: '#0073b1', color: 'white', border: 'none', borderRadius: '25px', padding: '12px 25px', cursor: 'pointer', fontSize: '1.2em', transition: 'background-color 0.3s ease',
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
                backgroundColor: 'white', padding: '20px', marginBottom: '25px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease'
              }}
            >
              {/* User Profile Section */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <img
                  src={post.profilePic}
                  alt="Profile"
                  style={{
                    width: '50px', height: '50px', borderRadius: '50%', marginRight: '15px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <div>
                  <span style={{ fontWeight: '700', fontSize: '1.3em', color: '#0073b1' }}>{post.username}</span>
                  <p style={{ fontSize: '1em', margin: '5px 0', color: '#555' }}>{post.title} | {post.location}</p>
                </div>
              </div>

              {/* Post Content */}
              <p style={{ fontSize: '1.2em', margin: '20px 0', lineHeight: '1.6' }}>{post.content}</p>

              {/* Post Hashtags */}
              <div style={{ marginTop: '10px' }}>
                {post.hashtags.map((hashtag, index) => (
                  <span key={index} style={{ color: '#0073b1', fontWeight: '600', fontSize: '1em', marginRight: '8px' }}>
                    {hashtag}
                  </span>
                ))}
              </div>

              {/* Like, Comment, Repost Buttons */}
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <button
                    onMouseEnter={() => setShowReactionOptions(post.id)} // Show reaction options on hover
                    onClick={() => handleLike(post.id)} // Toggle like on click
                    style={{
                      backgroundColor: 'white', color: '#0073b1', border: '1px solid #ddd', borderRadius: '25px', padding: '8px 20px', cursor: 'pointer', fontSize: '1.2em', margin: '5px', transition: 'all 0.3s ease',
                    }}
                  >
                    <img src={likeIcon} alt="like" style={{ width: '18px', marginRight: '8px' }} />
                    {post.liked ? 'Unlike' : 'Like'} ({post.likes})
                  </button>
                  {showReactionOptions === post.id && (
                    <div style={{
                      position: 'absolute', top: '30px', left: '0', backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '10px', zIndex: 1, display: 'flex', justifyContent: 'space-evenly'
                    }}>
                      <button onClick={() => handleReaction(post.id, 'Like')} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <img src={likeIcon} alt="like" style={{ width: '20px', marginRight: '8px' }} />
                        Like
                      </button>  <button onClick={() => handleReaction(post.id, 'Like')} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <img src={loveIcon} alt="like" style={{ width: '20px', marginRight: '8px' }} />
                        Love
                      </button>
                      <button onClick={() => handleReaction(post.id, 'Angry')} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <img src={angryIcon} alt="angry" style={{ width: '20px', marginRight: '8px' }} />
                        Angry
                      </button>
                      <button onClick={() => handleReaction(post.id, 'Sad')} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                        <img src={sadIcon} alt="sad" style={{ width: '20px', marginRight: '8px' }} />
                        Sad
                      </button>
                    </div>
                  )}
                </div>
                <button
                  style={{
                    backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2em', display: 'flex', alignItems: 'center', color: '#0073b1',border: '1px solid #ddd', borderRadius: '25px'
                  }}
                >
                  <img src={commentIcon} alt="comment" style={{ width: '20px', marginRight: '8px' }} />
                  Comment
                </button>  <button
                  style={{
                    backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2em', display: 'flex', alignItems: 'center', color: '#0073b1',border: '1px solid #ddd', borderRadius: '25px'
                  }}
                >
                  <img src={Repost} alt="comment" style={{ width: '20px', marginRight: '8px' }} />
                  Repost
                </button>
              </div>

                  {/* Display Comments */}
                  <div style={{ marginTop: '15px' }}>
                    {post.comments.map((comment, index) => (
                      <div key={index} style={{ marginBottom: '10px', fontSize: '1.1em', color: '#555' }}>
                        <strong>{comment.author}: </strong>{comment.text}
                      </div>
                    ))}
                  </div>
              {/* Comment Section */}
              <div style={{ marginTop: '20px' }}>
                <textarea
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  style={{
                    width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1em', fontFamily: 'Arial, sans-serif',
                  }}
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  style={{
                    backgroundColor: '#0073b1', color: 'white', border: 'none', borderRadius: '25px', padding: '8px 20px', cursor: 'pointer', fontSize: '1em', marginTop: '10px',
                  }}
                >
                  Add Comment
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AboutSection;

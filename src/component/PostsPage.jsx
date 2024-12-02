import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderSection from './HeaderSection';
import Footer from './Footer';
import '../css/posts.css';
import { useUser } from './UserContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const PostsPage = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    const [selectedDate, setSelectedDate] = useState(null);
    const [comments, setComments] = useState({});
    const [commentContent, setCommentContent] = useState({});
    const [expandedPost, setExpandedPost] = useState(null);
    const [commentsCounts, setCommentsCounts] = useState({});
    const { userData, loading } = useUser();

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://10.100.100.149:500/API/Posts/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            });

            const postsData = response.data.sort((a, b) =>
                new Date(b.created_at) - new Date(a.created_at)
            );

            const countsPromises = postsData.map(post =>
                axios.get(`http://10.100.100.149:500/API/Comment/?post=${post.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    }
                })
            );

            const countsResponses = await Promise.all(countsPromises);
            const newCommentsCounts = {};
            countsResponses.forEach((response, index) => {
                newCommentsCounts[postsData[index].id] = response.data.length;
            });

            setPosts(postsData);
            setCommentsCounts(newCommentsCounts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const fetchComments = async (postId) => {
        try {
            const response = await axios.get(`http://10.100.100.149:500/API/Comment/?post=${postId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            });
            setComments(prev => ({
                ...prev,
                [postId]: response.data
            }));
            // Update comments count
            setCommentsCounts(prev => ({
                ...prev,
                [postId]: response.data.length
            }));
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentSubmit = async (postId) => {
        try {
            await axios.post('http://10.100.100.149:500/API/Comment/', {
                content: commentContent[postId],
                post: postId
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                }
            });
            setCommentContent(prev => ({ ...prev, [postId]: '' }));
            fetchComments(postId);
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [submitted]);

    const filterByDate = (posts) => {
        if (!selectedDate) return posts;
        return posts.filter(post => {
            const postDate = new Date(post.created_at).toLocaleDateString();
            const filterDate = new Date(selectedDate).toLocaleDateString();
            return postDate === filterDate;
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5242880) { // 5MB max
                alert('حجم الصورة يجب أن يكون أقل من 5 ميجابايت');
                return;
            }

            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                alert('يرجى اختيار صورة بصيغة PNG أو JPEG أو JPG');
                return;
            }

            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Add content
        formData.append('content', content);

        if (image) {
            // Directly append the image file to media field
            formData.append('media', image);
        }

        try {
            const response = await axios.post('http://10.100.100.149:500/API/Posts/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            setSubmitted(!submitted);
            setContent('');
            setImage(null);
            document.querySelector('input[type="file"]').value = '';

        } catch (error) {
            console.error('Post submission error:', error);
        }
    };




    const filteredPosts = filterByDate(posts);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const filterSection = (
        <div className="filter-section card shadow-sm mb-4 p-3">
            <div className="d-flex gap-3 align-items-center">
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    placeholderText="اختر التاريخ"
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                />
                <button
                    className="btn btn-secondary"
                    onClick={() => setSelectedDate(null)}
                >
                    مسح الفلتر
                </button>
            </div>
        </div>
    );

    const pagination = (
        <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                        السابق
                    </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                    <li
                        key={index + 1}
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    >
                        التالي
                    </button>
                </li>
            </ul>
        </nav>
    );

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">جاري التحميل...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
        <div className="posts-page">
            <HeaderSection isLoggedIn={true} />
            <div>
                {(() => {
                    if (userData?.role === 2 || userData?.role === 3) {
                        return <h1 style={{ fontWeight: "bolder" }}><br />😷😷أسألة المـريـض </h1>;
                    }
                    if (userData?.role === 1) {
                        return <h1 style={{ fontWeight: "bolder" }}><br />👨‍⚕️🧑‍⚕️أسألتك</h1>;
                    }
                    return null;
                })()}
            </div>
            <div className="container container_Post mt-4">
                {userData?.role !== 3 && (
                    <div className="create-post-card shadow-sm">
                        <form onSubmit={handleSubmit}>
                            <textarea
                                className="create-post-input"
                                placeholder="ماذا يدور في ذهنك؟"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                            <div className="d-flex align-items-center">
                                <div className="file-upload me-2">
                                    <label className="btn btn-light">
                                        <i className="fas fa-image me-2"></i>
                                        إضافة صورة
                                        <input
                                            type="file"
                                            hidden
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary flex-grow-1">
                                    نشر
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                {filterSection}
                <div className="posts-container">
                    {currentPosts.length > 0 ? (
                        currentPosts.map((post) => (
                            <div key={post.id} className="post-card">
                                <div className="post-header">
                                    <div className="post-avatar"></div>
                                    <div className="post-user-info">
                                        <div className="post-username">
                                            {(() => {
                                                if (userData?.role === 2 || userData?.role === 3) {
                                                    return <div>مريض</div>;
                                                }
                                                if (userData?.role === 1) {
                                                    return <div>{userData?.fullname}</div>;
                                                }
                                                return null;
                                            })()}
                                        </div>
                                        <div className="post-timestamp">
                                            {new Date(post.created_at).toLocaleString('ar-EG')}
                                        </div>
                                    </div>
                                </div>

                                <div className="post-content">
                                    <div className="post-text">{post.content}</div>
                                    {post.media && (
                                        <div className="image-container">
                                            <img
                                                src={`http://10.100.100.149:500${post.media}`}
                                                alt="Post"
                                                className="post-image"
                                                loading="lazy"
                                                onClick={(e) => {
                                                    e.target.requestFullscreen();
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="post-actions">
                                    <div
                                        className="post-action-button"
                                        onClick={() => {
                                            setExpandedPost(expandedPost === post.id ? null : post.id);
                                            if (expandedPost !== post.id) {
                                                fetchComments(post.id);
                                            }
                                        }}
                                    >
                                        الرد ({commentsCounts[post.id] || 0})<i className="far fa-comment me-2"></i>
                                    </div>
                                </div>
                                <div className={`comments-section ${expandedPost === post.id ? 'show' : ''}`}>
                                    {expandedPost === post.id && (
                                        <>
                                            <div className="comments-list">
                                                {comments[post.id]?.map((comment) => (
                                                    <div key={comment.id} className="comment">
                                                        <div className="comment-user"> دكتور /
                                                            {comment.doctor || 'دكتور'}
                                                        </div>
                                                        <div className="comment-content">
                                                            {comment.content}
                                                        </div>
                                                        <div className="comment-timestamp">
                                                            {new Date(comment.created_at).toLocaleString('ar-EG')}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {userData?.role === 3 && (
                                                <form
                                                    className="comment-form"
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        handleCommentSubmit(post.id);
                                                    }}
                                                >
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="اكتب ردك..."
                                                        value={commentContent[post.id] || ''}
                                                        onChange={(e) => setCommentContent(prev => ({
                                                            ...prev,
                                                            [post.id]: e.target.value
                                                        }))}
                                                        required
                                                    />
                                                    <button type="submit" className="btn btn-primary mt-2">
                                                        تعليق
                                                    </button>
                                                </form>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-posts-message">
                            <i className="fas fa-inbox"></i>
                            <h3 style={{ color: '#333', marginBottom: '10px' }}>لا توجد منشورات</h3>
                            <p style={{ color: '#666' }}>لم يتم العثور على أي منشورات في الوقت الحالي</p>
                        </div>
                    )}
                </div>

                {pagination}
            </div>
            <br />
            </div>
            <Footer />
        </div>
    );
};

export default PostsPage;

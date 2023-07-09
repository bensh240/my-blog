import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSinglePostById, getComments, addComment, updatePost } from '../apiData.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Post from './Post';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const IndividualPostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editedPostContent, setEditedPostContent] = useState('');
    const [editedImage, setEditedImage] = useState('');
    const [editedTitle, setEditedTitle] = useState('');

    useEffect(() => {
        const fetchDataAsync = async () => {
            const foundPost = await getSinglePostById(postId);
            setPost(foundPost);

            if (foundPost) {
                const postComments = await getComments(postId);
                setComments(postComments);
            }
        };
        fetchDataAsync();
    }, [postId]);

    const handleAddComment = async (newComment) => {
        const res = await addComment(postId, newComment);
        if (res === null) {
            // Display a message to the user that they must log in to post a comment
            window.alert("Please log in to post a comment.");
        }
        const postComments = await getComments(postId);
        setComments(postComments);
        console.log('res', res);
    };

    const handleEditPost = () => {
        setIsEditMode(true);
        setEditedPostContent(post?.body || '');
        setEditedImage(post?.link_picture || '');
        setEditedTitle(post?.title || '');
    };

    const handleUpdatePost = async () => {
        const updatedPostData = {
            body: editedPostContent,
            link_picture: editedImage,
            title: editedTitle,
        };

        await updatePost(postId, updatedPostData);
        setIsEditMode(false);
        // Perform any additional actions or updates after updating the post
    };

    if (!post) {
        return <h1>Loading...</h1>;
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5', marginTop: 4, marginBottom: 2 }}>
                    {post.title}
                </Typography>
                <Post
                    key={post.id}
                    postId={post.id}
                    title={isEditMode ? editedTitle : post?.title}
                    image={isEditMode ? editedImage : post?.link_picture}
                    body={isEditMode ? editedPostContent : post?.body}
                    date={post.date_post}
                    author={post?.author || ''}
                    comments={comments}
                    setComments={setComments}
                    handleAddComment={handleAddComment}
                    isEditMode={isEditMode}
                    handleUpdatePost={handleUpdatePost}
                >
                    {post?.content}
                </Post>
                {!isEditMode && (
                    <Fab
                        color="primary"
                        aria-label="edit"
                        sx={{ position: 'fixed', bottom: 16, right: 16 }}
                        onClick={handleEditPost}
                    >
                        <EditIcon />
                    </Fab>
                )}
                {isEditMode && (
                    <Box sx={{ marginTop: 2 }}>
                        <TextField
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            fullWidth
                            variant="outlined"
                            placeholder="Edit post title"
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            value={editedImage}
                            onChange={(e) => setEditedImage(e.target.value)}
                            fullWidth
                            variant="outlined"
                            placeholder="Edit post image URL"
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            value={editedPostContent}
                            onChange={(e) => setEditedPostContent(e.target.value)}
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            placeholder="Edit post content"
                            sx={{ marginBottom: 2 }}
                        />
                        <Button onClick={handleUpdatePost} sx={{ marginRight: 2 }}>
                            Update Post
                        </Button>
                        <Button onClick={() => setIsEditMode(false)}>Cancel</Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default IndividualPostPage;
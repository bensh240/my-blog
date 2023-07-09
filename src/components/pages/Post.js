import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import {deletePost, addComment, getComments} from '../apiData';

const Post = (props) => {
    const {
        postId,
        title,
        author,
        date,
        body,
        image,
        handleDeletePost,
    } = props;
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/posts/${postId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchComments();
    }, [postId]);

    const handleAddComment = async (newComment) => {
        const res = await addComment(postId, newComment);
        const postComments = await getComments(postId);
        setComments(postComments);
        if (res === null) {
            // Display a message to the user that they must log in to post a comment
            window.alert("Please log in to post a comment.");
        }

        console.log('res', res);
    };


    return (
        <Card sx={{ minWidth: 275, marginBottom: 1 }}>
            <CardMedia component="img" width="30" height="300" image={image} alt={title} />
            <CardContent sx={{ maxHeight: '500px', overflowY: 'auto' }}>
                <Typography variant="h5" component="div">
                    {title}
                    {body}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    {props.children}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" display="block" sx={{ marginTop: 2 }}>
                    {date} by {author}
                </Typography>
                <Box sx={{ maxHeight: '100px', overflowY: 'auto' }}>
                    {comments &&
                        comments.map((comment, index) => (
                            <Card key={comment.id} sx={{ marginTop: 2 }}>
                                <CardHeader
                                    avatar={<Avatar>{comment.comment_writer.slice(0, 1)}</Avatar>}
                                    title={comment.body}
                                    subheader={`Commented by ${comment.comment_writer}`}
                                />
                                {index !== comments.length - 1 && <Divider />}
                            </Card>
                        ))}
                </Box>
                <TextField
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    sx={{ marginTop: 2 }}
                />
                <CardActions>
                    <Button onClick={() => handleAddComment(newComment)} sx={{ marginTop: 2 }}>
                        Add Comment
                    </Button>

                    <Button onClick={() => deletePost(postId)} startIcon={<DeleteIcon />} color="error" sx={{ marginTop: 2 }}>
                        Delete Post
                    </Button>
                </CardActions>
                <Typography variant="body2" color="primary">
                    <Link to={`/chosenPost/${postId}`} style={{ textDecoration: 'none', marginTop: '16px', display: 'block' }}>
                        Read more
                    </Link>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Post;

import React, { useEffect, useState } from 'react';
import Post from './Post';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import axios from 'axios';

const PostPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get('/posts')
            .then((response) => {
                const data = response.data;
                setPosts(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Container maxWidth="md">
            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    All Posts
                </Typography>
                <Grid container spacing={2}>
                    {posts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <Post
                                postId={post.id}
                                title={post.title.slice(0, 50) + '...'}
                                image={post.link_picture}
                                date={post.date_post}
                                author={post.author}
                            >
                                {post.body.slice(0, 20) + '...'}
                            </Post>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default PostPage;

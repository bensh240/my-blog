import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import { addPost } from '../apiData.js';

function NewPostPage()  {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [link_picture, setLinkPicture] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'body') {
            setBody(value);
        } else if (name === 'link_picture') {
            setLinkPicture(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPost = {
            title,
            body,
            link_picture,
        };

        addPost(newPost)
            .then((data) => {
                if (data) {
                    console.log(data);
                    navigate('/postPage')
                } else {
                    console.log("No data returned from the server");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Container maxWidth="sm">
            <Box my={4}>
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                    New Post
                </Typography>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            name="title"
                            value={title}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Body"
                            multiline
                            rows={4}
                            variant="outlined"
                            name="body"
                            value={body}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Picture Link"
                            variant="outlined"
                            name="link_picture"
                            value={link_picture}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default NewPostPage;

import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { userInfo } from "./pages/LoginPage";
import {getUserInfo, logout} from "./apiData";

const Menu = (props) => {
    const { sessionId, isLoggingIn, setIsLoggingIn } = props;

    useEffect(() => {
        const fetchData = async () => {
            if (sessionId) {
                const response = await getUserInfo();
                setIsLoggingIn(true);
                userInfo.set(response)
            } else {
                setIsLoggingIn(false);
            }
        }
        fetchData();
    }, [sessionId, setIsLoggingIn]);

    const handleLogout = () => {
        userInfo.set(null);
        setIsLoggingIn(false);
        logout();
    }

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                    My Blog
                </Typography>
                {isLoggingIn ? (
                    <div sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button component={Link} to="/about" color="inherit">About Me</Button>
                        <Button component={Link} to="/NewPostPage" color="inherit">New Post</Button>
                        <Button component={Link} to="/postPage" color="inherit">Posts</Button>
                        <Button onClick={handleLogout} color="inherit">Logout</Button>
                        <Typography color="inherit" >Hello {userInfo.data.username}</Typography>
                    </div>
                ) : (
                    <div>
                        <Button component={Link} to="/about" color="inherit">About Me</Button>
                        <Button component={Link} to="/LoginPage" color="inherit">Login</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Menu;

import React, { Component } from 'react';
import '../styles/Sidebar.css';
import { Link } from 'react-router-dom';
import { postData } from './apiData';

class Sidebar extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                {postData.map(post => (
                    <h3 key={post.id}>
                        {post.title} <Link to={`/posts/${post.id}`}>go to page</Link>
                    </h3>
                ))}
            </div>
        );
    }
}

export default Sidebar;

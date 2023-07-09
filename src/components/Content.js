import React from "react";
import "../styles/Content.css";
import Post from "./pages/Post";
import Sidebar from "./Sidebar";
import {postData} from "./apiData";



function Content(props){
    const { numOfPostToShow } = props;
    function renderPost(post) {
        return (
            <div className="row" key={post.id}>
                <div className="left">
                    <Post
                        id={post.id}
                        title={post.title}
                        image={post.image}
                        date={post.date}
                        author={post.author}
                    >
                        {post.content}
                    </Post>
                </div>
                <div className="right">
                    <Sidebar
                        title={post.id === 1 ? "Latest" : "Popular"}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="container" id="content">
            {postData.map((post,index) => index < numOfPostToShow && renderPost(post) )}
        </div>
    );

}
export default Content;

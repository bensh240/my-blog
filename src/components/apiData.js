import axios from "axios";


export const getPosts = async () => {
    try {
        const response = await axios.get('/posts');
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



export const addPost = async (postData) => {
    console.log((postData.body))
    console.log((postData.title))
    try {
        const response = await axios.post('/posts', postData, { withCredentials: true });
        if (response.status === 201) { // 201 means Created, successfully added new resource
            console.log(response.data.message);
        } else if (response.status === 400) { // 400 means Bad request, the request was not processed
            console.error(response.data.error); // log the error message
        }

        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};



export const getSinglePostById = async (postId) => {
    try {
        const response = await axios.get(`/posts/${postId}`,{ withCredentials: true });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
    export const updatePost = async (postId, updatedPostData) => {
        try {
            const response = await axios.put(`/posts/delete_or_update/${postId}`, updatedPostData, { withCredentials: true });
            const data = response.data;
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };





export const doSignUp = async ({ username, email, password, birth_date }) => {
    try {
        const response = await axios.post('/users', {
            username,
            email,
            password,
            birth_date
        });

        return response.data;
    } catch (err) {
        console.error(err);
        throw err; // Re-throwing the error so it can be caught and handled in the component
    }
};


export const getComments = async (postId) => {
    try {
        const response = await axios.get(`/posts/${postId}/comments`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const addComment = async (postId, commentData) => {
    try {
        const response = await axios.post(`/posts/${postId}/comments`, { body: commentData }, { withCredentials: true });
        window.location.reload()
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getUserInfo = async () => {
    try {
        const response = await axios.get(`/session`,{ withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
export const logout = async () => {
    try {
        const response = await axios.post(`/logout`, null, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deletePost = async (postId) => {
    try {
        console.log(postId)
        await axios.delete(`/posts/delete_or_update/${postId}`, { withCredentials: true });
        window.location.reload()
    } catch (error) {
        console.log("error" , postId)
        console.log(postId)
        console.error(error);
    }
};

export const deleteComment = async (comment_id) => {
    try {
    await axios.delete(`/comments/delete_or_update/${comment_id}`, { withCredentials: true });
} catch (error) {
    console.error(error);
}
};
export const updateComment = async (postId, comment_id) => {
    try {
        const response = await axios.put(`/comments/delete_or_update/${postId}`, comment_id, { withCredentials: true });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};


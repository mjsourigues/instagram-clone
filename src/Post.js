import React from 'react';
import "./Post.css";
import Avatar from '@mui/material/Avatar';

function Post({username, caption, imageUrl}) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar 
                    className="post_avatar"
                    alt="Avatar" 
                    src="/static/images/avatar/3.jpg" />
                <h3>{username}</h3>
            </div>
            <img className="post__image" alt="Imagen" src={imageUrl} />
            <h4 className="post_text"><strong>{username}:</strong>{caption}</h4>
        </div>
    )
}

export default Post
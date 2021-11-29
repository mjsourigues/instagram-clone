import React, { useState, useEffect } from 'react';
import "./Post.css";
import Avatar from '@mui/material/Avatar';
import {db} from './firebase';
import "firebase/compat/firestore";
import 'firebase/storage';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";

function Post({postId, user, username, caption, imageUrl}) {
    const [comments, setComments] =useState([]);
    const [comment, setComment] =useState("");

    useEffect(()=>{
        let unsubscribe;
        if(postId){
            unsubscribe= db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timestamp","desc")
            .onSnapshot(snapshot => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }

        return () =>{
            unsubscribe();
        };
      }, [postId]);

      const postComment = (e) => {
        e.preventDefault()
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment("");
      }


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
            
            <div className="post__comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}:</strong> {comment.text}
                    </p>
                ))}
            </div>
                        
            {/* Formulario comentario en post */}
            <form className="post__commentBox">
                <input 
                    className="post__input" 
                    type="text"
                    placeholder="Ingresa comentarios.."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className="post__button"
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                >
                    Postear 👌 
                </button>
            </form>
        </div>
    )
}

export default Post

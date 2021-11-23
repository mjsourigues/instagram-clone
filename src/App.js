import { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import {db} from './firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

function App() {
  const [posts, setPost] = useState([]);

  useEffect(()=>{
    db.collection("posts").onSnapshot(snapshot => {
        setPost(snapshot.docs.map(doc => ({
          id: doc.id, 
          post: doc.data()
        })));
      })
  }, []);

  return (
    <div className="app">
        <div className="app__header">
          <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt="Logo Instragram"/>
        </div>
        <h1>Esto es una prueba de Instagram</h1>
        {
          posts.map(({id, post}) => (
              <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))
        }
    </div>
  );
}

export default App;

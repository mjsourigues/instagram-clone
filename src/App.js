import { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import {db,auth} from './firebase';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';
import ImageUpload from './ImageUpload';
// import InstagramEmbed from 'react-instagram-embed';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [posts, setPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSingIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const unsubscribe= auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        //user logueado
        console.log(authUser);
        setUser(authUser);
      }else{
        //user deslogueado
        setUser(null);
      }
    })

    return () => {
      //unsuscribe para limpiar logueo, accion de limpieza
      unsubscribe();
    }
  }, [user, username]);

  useEffect(()=>{
    db.collection("posts").orderBy("timestamp","desc").onSnapshot(snapshot => {
        setPost(snapshot.docs.map(doc => ({
          id: doc.id, 
          post: doc.data()
        })));
      })
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const singUp = (e) => {
    e.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser)=>{
      return authUser.user.updateProfile({
        displayName: username,
      })
    })
    .catch((error) => alert (error.message))
    setOpen(false);
  }

   const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    
    //Cerrar modal
    setOpenSignIn(false);
  }

  return (
    <div className="app">

        {/*MODAL REGISTRARSE*/}

        <Modal
          open={open}
          onClose={handleClose}
        >
        <Box sx={style}>
          <form className="app__singup">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <img
                className="app__headerImage"
                src="https://e7.pngegg.com/pngimages/349/300/png-clipart-logo-computer-icons-instagram-logo-miscellaneous-text.png"
                alt="Logo Instagram"
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Input
                  placeholder="Ingrese Usuario"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="Ingrese email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Ingrese contraseña"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Typography>
            <Button type="submit" onClick={singUp}>Iniciar Sesión</Button>
          </form>
        </Box>
        </Modal>

        {/*MODAL INICIAR SESION*/}

        <Modal
          open={openSingIn}
          onClose={() => setOpenSignIn(false)}
        >
        <Box sx={style}>
          <form className="app__singup">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <img
                className="app__headerImage"
                src="https://e7.pngegg.com/pngimages/349/300/png-clipart-logo-computer-icons-instagram-logo-miscellaneous-text.png"
                alt="Logo Instagram"
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Input
                placeholder="Ingrese email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Ingrese contraseña"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Typography>
            <Button type="submit" onClick={signIn}>Iniciar Sesión</Button>
          </form>
        </Box>
        </Modal>


        <div className="app__header">
          <img className="app__headerImage" 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" 
          alt="Logo Instragram"
          />

          {user ? (
            <Button onClick={()=>auth.signOut()}>Cerrar Sesión</Button>
            ):(
            <div className="app_loginContainer">
              <Button onClick={() => setOpenSignIn (true)}>Iniciar Sesión</Button>
              <Button onClick={() => setOpen (true)}>Registarse</Button>
            </div>
          )}
        </div>
            
        <div className="app_posts">
        {
          posts.map(({id, post}) => (
              <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
          ))
        }
        </div>

        {/* DEPRECATED
        {/* <InstagramEmbed
          url='https://instagr.am/p/Zw9o4/'
          clientAccessToken='123|456'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
        </div> */} 
        <div className="app__log">
          {user?.displayName ? (
              <ImageUpload username={user.displayName}/>
          ): (
            <center><h2>Debes iniciar sesión para postear!</h2></center>
          )}
        </div>
    </div>
  );
}

export default App;

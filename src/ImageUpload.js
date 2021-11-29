import React, { useState } from 'react'
import Button from '@mui/material/Button';
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {db, storage} from './firebase';
import 'firebase/storage';
import "./ImageUpload.css";
 
function ImageUpload({username}) {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (eventFile) => {
        if (eventFile.target.files[0]){
            setImage(eventFile.target.files[0]);
        }
    };

    const handleUpload = () =>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // FUNCION DE PROGRESO
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            (error) => {
                // FUNCION ERROR
                console.log(error);
                alert(error.message);
            },
            () => {
                // FUNCION SUBIDA TERMINADA
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // POST DE IMAGEN EN DB
                        db.collection("posts").add({
                            // timestamp se usa para determinar la subida mas reciente y mostrar el post al principio de la pagina.
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: username,
                            imagename: image.name,
                        })

                            
                        // Setear todo en 0 despues de un post exitoso
                        setProgress(0);
                        setCaption('');

                        //No funciona el setImage como esperaba
                        setImage("null");
                        // // Scroll back to top and reset other states so that it goes back to default list
                        // document.body.scrollTop = 0; // For Safari
                        // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                        // // viewwhichuser('');
                        // // viewsinglepost(false);
                    });
            }
        );
    };

    return (
        <div className="imageupload">
            {/*INPUT DE DESCRIPCION*/}
            {/*Seleccionar archivo*/}
            {/*Boton Postear */}
            <progress className="imageupload__progress" value={progress} max="100" />
            <input type="text" value={caption} placeholder="Ingrese descripción" onChange={event => setCaption(event.target.value)}></input>
            <input type="file" id="file_input_file" onChange={handleChange}></input>
            <Button onClick={handleUpload}>
                Subir 🔼
            </Button>
        </div>
    )
}

export default ImageUpload;

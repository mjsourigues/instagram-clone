import './App.css';
import Post from './Post';

function App() {
  return (
    <div className="app">
        <div className="app__header">
          <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png" alt="Logo Instragram"/>
        </div>
        <h1>Esto es una prueba de Instagram</h1>

        <Post username="Matias" caption="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." imageUrl="https://thumbs.dreamstime.com/b/laptop-blank-screen-front-view-position-isolated-white-background-mockup-template-all-focus-70724098.jpg"/>
        <Post username="Rocio" caption="Esto dijo ella hoy" imageUrl="https://lapaginamillonaria.com/_next/image?url=https%3A%2F%2Flapaginamillonaria.com%2F__export%2F1614278573033%2Fsites%2Flpm%2Fimg%2F2021%2F02%2F25%2Friver_platense_clasico_crop1614278571782.jpg_1546398727.jpg&w=750&q=75" />
        <Post username="Juan" caption="Juan juega a las 15 hs" imageUrl="https://resizer.glanacion.com/resizer/7A6bxY8bMg8JwGDtVaxC8oeg2SE=/351x234/smart/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/OJ7BABOYBBFXNJYMCUWNKEUP7U.jpg" />
    </div>
  );
}

export default App;

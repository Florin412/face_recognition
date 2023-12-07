import { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container my-5">
        <ParticlesBg type="cobweb" bg={true} num={50} />
        <Navigation></Navigation>
        <Logo></Logo>
        <Rank></Rank>
        <ImageLinkForm></ImageLinkForm>
        {/* <FaceRecognition></FaceRecognition> */}
      </div>
    );
  }
}

export default App;

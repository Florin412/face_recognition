import { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container my-5">
        <Navigation></Navigation>
        <Logo></Logo>
        {/* <Rank></Rank> */}
        <ImageLinkForm></ImageLinkForm>
        {/* <FaceRecognition></FaceRecognition> */}
      </div>
    );
  }
}

export default App;

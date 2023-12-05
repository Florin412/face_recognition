import { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";

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
        {/* <ImageLinkForm></ImageLinkForm> */}
        {/* <FaceRecognition></FaceRecognition> */}
      </div>
    );
  }
}

export default App;

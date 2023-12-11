import { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

// Here you can set the model you are using from Clarifai API.
const getModelId = () => {
  return "face-detection";
};

const getRequestOptions = (imageURL) => {
  const PAT = "fb9e54191c4247b692492bb0febbd734";
  const USER_ID = "lupau412";
  const APP_ID = "my_app";
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT
    },
    body: raw
  };

  return requestOptions;
};

// App component
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {}
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    const box = {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      buttonRow: height - clarifaiFace.bottom_row * height
    };

    console.log(box);

    return box;
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState(
      {
        imageURL: this.state.input
      },
      () =>
        fetch(
          "https://api.clarifai.com/v2/models/" + getModelId() + "/outputs",
          getRequestOptions(this.state.imageURL)
        )
          .then((response) => response.json())
          .then((result) => {
            this.displayFaceBox(this.calculateFaceLocation(result));
          })
          .catch((error) => console.log("error", error))
    );
  };

  render() {
    return (
      <div className="container my-5">
        <ParticlesBg type="cobweb" bg={true} num={50} />
        <Navigation></Navigation>
        <Logo></Logo>
        <Rank></Rank>
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        ></ImageLinkForm>
        <FaceRecognition
          imageURL={this.state.imageURL}
          box={this.state.box}
        ></FaceRecognition>
      </div>
    );
  }
}

export default App;

import { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const getModelId = () => {
  return "face-detection";
};

const returnRequestOptions = (imageURL) => {
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
      imageURL: ""
    };
  }

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
          returnRequestOptions(this.state.imageURL)
        )
          .then((response) => response.json())
          .then((result) =>
            console.log(
              result.outputs[0].data.regions[0].region_info.bounding_box
            )
          )
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
        {/* in the below component, the image will be displayed */}
        <FaceRecognition imageURL={this.state.imageURL}></FaceRecognition>
      </div>
    );
  }
}

export default App;

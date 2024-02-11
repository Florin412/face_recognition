import { Component } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

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
      box: {},
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    };
  }

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    });
  };

  // When route is changing, we also have to change the isSignedIn state.
  onRouteChange = (routeToGo) => {
    this.setState({ route: routeToGo }, () => {
      if (this.state.route === "home") {
        // If we are in home page, means that we are signed in.
        this.setState({ isSignedIn: true });
      } else {
        // If we are not in the home page, we are not signed in.
        this.setState({ isSignedIn: false });
      }
    });
  };

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
      bottomRow: height - clarifaiFace.bottom_row * height
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
      () => {
        fetch(
          "https://api.clarifai.com/v2/models/" + getModelId() + "/outputs",
          getRequestOptions(this.state.imageURL)
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result, "aici sunt");

            if (result.status.description === "Input invalid argument") {
              console.err("You MUST enter a valid URL");
            } else {
              fetch("http://localhost:3000/image", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  id: this.state.user.id
                })
              })
                .then((res) => res.json())
                .then((entries) => {
                  this.setState(Object.assign(this.state.user, { entries }));
                })
                .catch((err) =>
                  console.log("Error fetching entries'user from our server api")
                );

              this.displayFaceBox(this.calculateFaceLocation(result));
            }
          })
          .catch((error) =>
            console.log("Error fetching data from Clarifai API", error)
          );
      }
    );
  };

  render() {
    let content;
    const { route, imageURL, box, isSignedIn } = this.state;

    if (route === "signin") {
      content = (
        <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
      );
    } else if (route === "home") {
      content = (
        <div>
          <Logo></Logo>
          <Rank
            entries={this.state.user.entries}
            name={this.state.user.name}
          ></Rank>
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          ></ImageLinkForm>
          <FaceRecognition imageURL={imageURL} box={box}></FaceRecognition>
        </div>
      );
    } else if (route === "register") {
      content = (
        <Register
          loadUser={this.loadUser}
          onRouteChange={this.onRouteChange}
        ></Register>
      );
    }

    return (
      <div className="container my-5">
        <ParticlesBg type="cobweb" bg={true} num={100} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        ></Navigation>
        {content}
      </div>
    );
  }
}

export default App;

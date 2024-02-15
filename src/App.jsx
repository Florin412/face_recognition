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

const initialState = () => {
  return {
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
};

// App component
class App extends Component {
  constructor() {
    super();
    this.state = initialState();
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

  onRouteChange = (routeToGo) => {
    if (routeToGo === "signin" || routeToGo === "register") {
      // we reset the state of the app if we are not logged in the app.
      this.setState(initialState());
    } else if (routeToGo === "home") {
      this.setState({ isSignedIn: true });
    }

    this.setState({ route: routeToGo });
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
        // Here we make a request to our server that will make a request to the Clarifai API
        // in order to hide the API KEY.
        fetch("https://smart-brain-api-jklb.onrender.com/imageurl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            input: this.state.input
          })
        })
          .then((data) => {
            return data.json();
          })
          .then((result) => {
            console.log(result);

            if (result) {
              // Increment the entries if api gives us a valid response.
              fetch("https://smart-brain-api-jklb.onrender.com/image", {
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

import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import { localHostServerLink, hostedServerLink } from "./URL_Links";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

// We are currently in development mode, so we're using localhost.
// Change this value when deploying to a production server.
const connectionToBackendLink = localHostServerLink;

const initialUserState = {
  id: "",
  name: "",
  email: "",
  entries: 0,
  joined: ""
};

const App = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [arrayOfBoxes, setArrayOfBoxes] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(initialUserState);

  const loadUser = (userToLoad) => {
    setUser(userToLoad);
  };

  const onSignOut = () => {
    // clear all the stored data about the previous user when sign out the app.
    setIsSignedIn(false);
    setUser(initialUserState); // Reset user state on sign out
    setInput("");
    setImageUrl("");
    setArrayOfBoxes([]);
  };

  const calculateFaceLocation = (data) => {
    const arrayOfBoxes = [];
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    // Here we iterete throw all faces returned by API, and calculate the face coordonates for each face.
    data.outputs[0].data.regions.forEach((element) => {
      const clarifaiFace = element.region_info.bounding_box;

      const box = {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height
      };

      arrayOfBoxes.push(box);
    });

    return arrayOfBoxes;
  };

  const displayFaceBox = (arrayOfBoxes) => {
    setArrayOfBoxes(arrayOfBoxes);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);

    fetch(connectionToBackendLink + "imageurl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: input
      })
    })
      .then((data) => data.json())
      .then((result) => {
        if (result.status.code === 10000) {
          fetch(connectionToBackendLink + "image", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then((res) => res.json())
            .then((entries) => {
              setUser((prevUser) => ({ ...prevUser, entries }));
            })
            .catch((err) =>
              console.log("Error fetching entries' user from our server api")
            );

          displayFaceBox(calculateFaceLocation(result));
        } else if (result.status.code === 30002) {
          alert(
            "The image processing failed, as some URLs restrict downloads. Try with a different image URL."
          );
        } else {
          console.log("You should enter a valid HTTPS URL");
        }
      })
      .catch((error) =>
        console.log("Error fetching data from Clarifai API", error)
      );
  };

  return (
    <Router>
      <div className="container my-5">
        <ParticlesBg type="cobweb" bg={true} num={25} />
        <Navigation isSignedIn={isSignedIn} onSignOut={onSignOut} />

        <Routes>
          {/* Redirect from / to /signin */}
          <Route path="/" element={<Navigate to="/signin" />} />

          <Route
            path="/signin"
            element={
              <Signin
                loadUser={loadUser}
                connectionToBackendLink={connectionToBackendLink}
                onSignIn={() => setIsSignedIn(true)} // Update the isSignedIn state to true upon authentication
              />
            }
          />
          <Route
            path="/register"
            element={
              <Register
                loadUser={loadUser}
                onSignIn={() => setIsSignedIn(true)} // Update the isSignedIn state to true upon authentication
                connectionToBackendLink={connectionToBackendLink}
              />
            }
          />
          <Route
            path="/home"
            element={
              isSignedIn ? (
                <div>
                  <Logo />
                  <Rank entries={user.entries} name={user.name} />
                  <ImageLinkForm
                    onInputChange={onInputChange}
                    onButtonSubmit={onButtonSubmit}
                  />
                  <FaceRecognition
                    imageUrl={imageUrl}
                    arrayOfBoxes={arrayOfBoxes}
                  />
                </div>
              ) : (
                <Navigate to="/signin" /> // Redirect to /signin if the user is not authenticated
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";

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
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(initialUserState);

  const loadUser = (userToLoad) => {
    setUser(userToLoad);
  };

  const onRouteChange = (route) => {
    if (route === "signin") {
      setInput("");
      setImageUrl("");
      setBox({});
      setIsSignedIn(false);
      setUser(initialUserState);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  const calculateFaceLocation = (data) => {
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

    return box;
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageUrl(input);

    fetch("https://smart-brain-api-jklb.onrender.com/imageurl", {
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
          fetch("https://smart-brain-api-jklb.onrender.com/image", {
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
        } else {
          console.log("You should enter a valid HTTPS URL");
        }
      })
      .catch((error) =>
        console.log("Error fetching data from Clarifai API", error)
      );
  };

  let content;
  if (route === "signin") {
    content = <Signin loadUser={loadUser} onRouteChange={onRouteChange} />;
  } else if (route === "home") {
    content = (
      <div>
        <Logo />
        <Rank entries={user.entries} name={user.name} />
        <ImageLinkForm
          onInputChange={onInputChange}
          onButtonSubmit={onButtonSubmit}
        />
        <FaceRecognition imageUrl={imageUrl} box={box} />
      </div>
    );
  } else if (route === "register") {
    content = <Register loadUser={loadUser} onRouteChange={onRouteChange} />;
  }

  return (
    <div className="container my-5">
      <ParticlesBg type="cobweb" bg={true} num={50} />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {content}
    </div>
  );
};

export default App;

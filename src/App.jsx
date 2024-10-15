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
import { localHostServerLink } from "./URL_Links";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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

  let navigate = useNavigate();

  const getUserProfile = (token) => {
    fetch(connectionToBackendLink + "profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Eroare la preluarea profilului utilizatorului");
        }
        return response.json();
      })
      .then((data) => {
        loadUser(data);
        setIsSignedIn(true);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Eroare:", error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch(connectionToBackendLink + "verify-token", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.valid) {
            getUserProfile(token);
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch((err) => {
          console.error("Eroare la verificarea tokenului:", err);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const loadUser = (userToLoad) => {
    setUser(userToLoad);
  };

  const onSignOut = () => {
    setIsSignedIn(false);
    setUser(initialUserState);
    setInput("");
    setImageUrl("");
    setArrayOfBoxes([]);
    localStorage.removeItem("token");
  };

  const calculateFaceLocation = (data) => {
    const arrayOfBoxes = [];
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

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
    const token = localStorage.getItem("token");

    fetch(connectionToBackendLink + "imageurl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
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
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
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
    <div>
      <Navigation isSignedIn={isSignedIn} onSignOut={onSignOut} />

      <Routes>
        <Route
          path="/"
          element={<Navigate to={isSignedIn ? "/home" : "/signin"} />}
        />
        <Route
          path="/signin"
          element={
            <Signin
              loadUser={loadUser}
              connectionToBackendLink={connectionToBackendLink}
              onSignIn={() => setIsSignedIn(true)}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              loadUser={loadUser}
              connectionToBackendLink={connectionToBackendLink}
              onSignIn={() => setIsSignedIn(true)}
            />
          }
        />
        <Route
          path="/home"
          element={
            isSignedIn ? (
              <div>
                <ParticlesBg type="cobweb" bg={true} num={25} />
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
              <Navigate to="/signin" />
            )
          }
        />
        <Route
          path="*"
          element={<Navigate to={isSignedIn ? "/home" : "/signin"} />}
        />
      </Routes>
    </div>
  );
};

export default App;

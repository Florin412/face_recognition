import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, arrayOfBoxes }) => {
  return (
    <div className="d-center mt-4">
      <div style={{ position: "relative" }}>
        <img
          src={imageUrl}
          alt=""
          className="img-fluid"
          id="inputImage"
          width="500px"
          height="auto"
        />
        {arrayOfBoxes.map((box, index) => (
          <div
            key={index} // Fiecare element necesită o cheie unică
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
              position: "absolute" // Asigură-te că este poziționat corect
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;

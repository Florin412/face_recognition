import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className="d-center mt-4">
      <div style={{ position: "absolute" }}>
        <img
          src={imageURL}
          alt=""
          className="img-fluid"
          id="inputImage"
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;

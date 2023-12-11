const FaceRecognition = ({ imageURL }) => {
  return (
    <div className="d-center mt-4">
      <img src={imageURL} alt="" className="img-fluid" />
    </div>
  );
};

export default FaceRecognition;

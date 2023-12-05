import "./ImageLinkForm.css";

const ImageLinkForm = () => {
  return (
    <div className="text-center ">
      {/* Info Text */}
      <div className="h4 my-4">
        {"This Magic Brain will detect faces in your pictures. Give it a try."}
      </div>

      {/* Form */}
      <div className="d-center">
        <div
          className="bg-honey p-4 rounded"
          style={{
            display: "flex",
            width: "700px"
          }}
        >
          {/* Input */}
          <input
            className="form-control"
            type="text"
            placeholder="Type the image's url"
            style={{ width: "70%" }}
            name="url_for_image"
          />

          {/* Button */}
          <button
            type="button"
            className="bg-pink grow-on-hover rounded text-white"
            style={{ width: "30%" }}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;

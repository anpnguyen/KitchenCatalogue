import React, {memo} from "react";

function PreviewImage(props) {
  const { imageUrl, title } = props;

  return (
    <div className="previewItem">
      {!imageUrl ? (
        <div className="fillerImg" />
      ) : (
        <img className="image" src={imageUrl} alt={title} />
      )}
    </div>
  );
}

export default memo(PreviewImage)

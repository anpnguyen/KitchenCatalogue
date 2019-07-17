import React ,{memo} from "react";


function PreviewUsername(props) {
  const { user } = props;
  return (
    <div className="previewItem">
      <p>
        <span className="bold">By: </span> {user.username}{" "}
      </p>
    </div>
  );
}



export default memo(PreviewUsername);

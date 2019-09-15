import React , {memo}from "react";

function PreviewTitle(props) {
  const { title } = props;

  return (
    <div className="previewItem">
      <h1 className="">{!title ? "My Recipe Title" : title}</h1>
    </div>
  );
}

export default memo(PreviewTitle);

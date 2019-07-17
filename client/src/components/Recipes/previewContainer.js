import React ,{memo}from "react";


function previewContainer(props) {
  const { newRecipeStage } = props;
  return (
    <>
      {newRecipeStage === 1 && (
        <div className="previewContainer">
          <section className="preview">{props.children}</section>
        </div>
      )}
    </>
  );
}

export default memo(previewContainer);

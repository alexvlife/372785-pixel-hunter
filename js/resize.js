const resize = (frameData, imageData) => {
  const ratioWidth = frameData.width / imageData.width;
  const ratioHeight = frameData.height / imageData.height;
  const ratioMinimal = Math.min(ratioWidth, ratioHeight);
  const width = Math.floor(imageData.width * ratioMinimal);
  const height = Math.floor(imageData.height * ratioMinimal);
  return {width, height};
};

export default resize;

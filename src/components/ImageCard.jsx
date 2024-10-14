/* eslint-disable react/prop-types */
const ImageCard = ({ ...props }) => {
  return (
    <img
      className="mb-5 hover:scale-95 transition-transform duration-500 cursor-pointer"
      src={props.src}
      alt="Album"
    />
  );
};

export default ImageCard;

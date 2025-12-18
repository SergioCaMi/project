import "./directory-item.styles.scss";

const DirectoryItem = ({ category }) => {
  const { img, title } = category;
  return (
    <div className="directory-item-container">
      {/* <img src={img} alt={title}></img> */}
      <div
        className="background-image"
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div className="body">
        <h2>{title}</h2>
        <p>Comprar ahora!</p>
      </div>
    </div>
  );
};

export default DirectoryItem;

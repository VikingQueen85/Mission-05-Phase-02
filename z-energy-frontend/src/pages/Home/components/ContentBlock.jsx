import { Link } from "react-router-dom"
import "./ContentBlock.css"

function ContentBlock({
  title,
  description,
  imageUrl,
  imageAlt,
  linkUrl,
  buttonText,
  reversed = false,
}) {
  return (
    <div className={`content-block ${reversed ? "reverse-layout" : ""}`}>
      <div className="content-block-image-wrapper">
        <img src={imageUrl} alt={imageAlt} className="content-block-image" />
      </div>
      <div
        className={`content-block-text ${
          !reversed ? "content-block-text-align-right" : ""
        }`}>
        <h3 className="content-block-heading">{title}</h3>
        <p className="content-block-description">{description}</p>
        <Link
          to={linkUrl}
          className="content-block-button orange-gradient-button">
          {buttonText}
        </Link>
      </div>
    </div>
  )
}

export default ContentBlock

import StationFinder from "./components/StationFinder"
import ContentBlock from "./components/ContentBlock"
import "./Homepage.css"
import MainFooter from "../../common/MainFooter";

// Image Imports
import shareTankImgSrc from "../../assets/images/Sharetank.png"
import priceComparisonImgSrc from "../../assets/images/Price-Comparison.png"
import orderFoodImgSrc from "../../assets/images/Order-Food.png"

function Homepage() {
  // Content blocks data
  const contentBlocks = [
    {
      id: 1,
      title: "Sharetank",
      description:
        "Buy fuel when it's cheap and share it with up to 5 family members or friends. Save more together.",
      imageUrl: shareTankImgSrc,
      imageAlt: "Sharetank",
      linkUrl: "/share-tank",
      buttonText: "Learn more",
      reversed: true,
    },
    {
      id: 2,
      title: "Price Comparison",
      description:
        "Compare fuel prices across different Z stations to find the best deals near you. Save money on every fill-up.",
      imageUrl: priceComparisonImgSrc,
      imageAlt: "Price Comparison",
      linkUrl: "/price-comparison",
      buttonText: "Price comparison",
      reversed: false,
    },
    {
      id: 3,
      title: "Order Food Online",
      description:
        "Pre-order your favorite food and coffee from Z Espress and pick it up on the go.",
      imageUrl: orderFoodImgSrc,
      imageAlt: "Order Food Online",
      linkUrl: "/order-food",
      buttonText: "Order food",
      reversed: true,
    },
  ]

  return (
    <div className="homepage-main-container">
      <section className="top-banner-section">
        <h1 className="top-banner-text">Welcome to Z</h1>
      </section>

      {/* Hero Section */}
      <section className="main-image-section"></section>

      {/* Station Finder Component */}
      <StationFinder />

      {/* Content Blocks */}
      <section className="content-blocks-section">
        <div className="content-grid">
          {contentBlocks.map(block => (
            <ContentBlock
              key={block.id}
              title={block.title}
              description={block.description}
              imageUrl={block.imageUrl}
              imageAlt={block.imageAlt}
              linkUrl={block.linkUrl}
              buttonText={block.buttonText}
              reversed={block.reversed}
            />
          ))}
        </div>
      </section>
      <MainFooter />
    </div>
  )
}

export default Homepage

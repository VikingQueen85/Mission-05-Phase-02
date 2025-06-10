import { NavLink } from "react-router-dom"

const Homepage = () => {
  return (
    <>
      <div>Homepage</div>

      {/* Temporary links to pages */}
      <br />
      <br />
      <br />
      <div>Links to Pages</div>
      <NavLink to="/price-comparison">Price Comparison</NavLink>
    </>
  )
}
export default Homepage

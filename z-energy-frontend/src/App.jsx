
import { Routes, Route } from "react-router-dom"

/*========== Component Imports ==========*/
import Homepage from "./pages/Home/Homepage"
import PriceComparison from "./pages/PriceComparison/PriceComparison"
import Services from "./pages/Services/Services"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="price-comparison" element={<PriceComparison />} />
        <Route path="services" element={<Services />} />

        {/* For future nested routes */}
        {/* <Route path="/nested-route-path" element={<PageName />}>
          <Route path="nested-route-name1" element={<NestedComponent1 />} />
          <Route path="nested-route-name2" element={<NestedComponent2 />} />
        </Route> */}
      </Routes>
    </>
  )
}

export default App

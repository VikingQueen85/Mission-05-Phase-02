import { Routes, Route } from "react-router-dom"

import MobileHomepage from "./pages/Home/MobileHomepage.jsx"

function MobileApp() {
  return (
    <Routes>
      <Route path="/*" element={<MobileHomepage />} />

    </Routes>
  )
}

export default MobileApp

import { Route, Routes } from "react-router-dom"
import { routes } from "./routes"

export const Navigation = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route
          path={path}
          element={<Component />}
        />
      ))}
    </Routes>
  )
}

import { useState } from 'react'
import { publicRoutes } from './routes/routes';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from './pages/notFound/NotFound';


function App() {

  return (
    <>
      <BrowserRouter>
                <Routes>
                    {publicRoutes.map((route, idx) => (
                        <Route
                            key={idx}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
    </>
  )
}

export default App

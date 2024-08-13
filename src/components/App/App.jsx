import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"

const Navigation = lazy(() => import("../Navigation/Navigation"))
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"))
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"))
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"))
const MovieCast = lazy(() => import("../MovieCast/MovieCast"))
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"))
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"))

export default function App() {
    return (
        <>
            <Navigation/>
            <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/movies/:movieId" element={<MovieDetailsPage/ >}>
                <Route path="cast" element={<MovieCast />} />
                <Route path="rewiews" element={<MovieReviews />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </Suspense>
        </>
    );
    
}
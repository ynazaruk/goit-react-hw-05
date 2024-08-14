import axios from "axios";
import { useState, useEffect, useRef } from "react"
import { Outlet, Link, useParams, useLocation, useNavigate } from "react-router-dom";


const API_KEY = "894144de8bbafe2709358c4db6342469";


export default function MovieDetailsPage() {
    const {movieId} = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const prevLocation = useRef(location.state?.from || '/movies');

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    params: {api_key: API_KEY}
                });
                setMovie(response.data);
            } catch (err) {
                console.error('Error fetching movie details:', err);
            }
        }
        fetchMovieDetails();
    }, [movieId]);

    const handleGoBack = () => {
        navigate(prevLocation.current);
    };

    if (!movie) {
        return <div>Loading...</div>;
    }



    return (
        <div>
        <button onClick={handleGoBack}>Go back</button>
        <h1>{movie.title}</h1>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <p>{movie.overview}</p>
        <nav>
            <Link to="cast">Cast</Link>
            <Link to="reviews">Reviews</Link>
        </nav>
        <Outlet/>
        </div>
    );
}
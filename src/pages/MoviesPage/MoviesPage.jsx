import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const API_KEY = "894144de8bbafe2709358c4db6342469";


export default function MoviesPage() {
const [searchParams, setSearchParams] = useSearchParams();
const [loading, setLoading] = useState(false);
const [movies, setMovies] = useState([]);
const [error, setError] = useState("");

const query = searchParams.get("query") || "";

useEffect(() => {
    if (!query) {
        return;
    }

    async function fetchMovies() {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get("https://api.themoviedb.org/3/search/movie", {
                params: {
                    api_key: API_KEY,
                    query: query,
                    include_adult: false,
                },
            });
            setMovies(response.data.results);
        } catch (err) {
            setError("Error fetching movies", err)
        } finally {
            setLoading(false);
        }
    }
    fetchMovies();
}, [query]);


const handleSearch = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formQuery = form.elements.search.value.trim();

    if (formQuery) {
        setSearchParams({query: formQuery});
    }

}

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input type="text" 
                name="search" 
                defaultValue={query}
                placeholder="Search for movies"
                />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <MovieList movies={movies} />
        </div>
    );
}
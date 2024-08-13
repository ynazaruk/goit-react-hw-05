import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const API_KEY = "894144de8bbafe2709358c4db6342469";

export default function MoviesReviews {
    const [rewiews, setRewiews] = useState([]);
    const {moviesId} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchRewiews() {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
                    params: {api_key: API_KEY}
                });
                setRewiews(response.data.results);
            } catch (err) {
                setError("Error fetching reviews:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchRewiews();
    }, [movieId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <div>
            <h3>Rewiews</h3>
            <ul>
                {rewiews.length>0 ? (
                    rewiews.map(rewiew => (
                        <li key={rewiew.id}>
                            <h4>{rewiew.author}</h4>
                            <p>{rewiew.content}</p>
                        </li>
                    ))
                ) : (<li>No reviews available</li>)
            }

            </ul>
        </div>
    );
}
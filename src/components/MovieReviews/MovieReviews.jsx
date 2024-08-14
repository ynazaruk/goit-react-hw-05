import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "894144de8bbafe2709358c4db6342469";

export default function MoviesReviews() {
    const {movieId} = useParams();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchReviews() {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
                    params: {api_key: API_KEY}
                });
                setReviews(response.data.results);
            } catch (err) {
                setError("Error fetching reviews:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchReviews();
    }, [movieId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <div>
            <h3>Reviews</h3>
            <ul>
                {reviews.length>0 ? (
                    reviews.map(review => (
                        <li key={review.id}>
                            <h4>{review.author}</h4>
                            <p>{review.content}</p>
                        </li>
                    ))
                ) : (<li>No reviews available</li>)
            }

            </ul>
        </div>
    );
}
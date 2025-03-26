import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterMovies = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const apiKey = process.env.REACT_APP_API_KEY; // Replace with your TMDb API key

    console.log('API Key:', apiKey);
    console.log('API Key:', process.env.REACT_APP_API_KEY, "process.env", process.env);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=${apiKey}`);
                setCharacters(response.data.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [apiKey]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Popular Characters</h1>
            <ul>
                {characters.map(character => (
                    <li key={character.id}>
                        <h2>{character.name}</h2>
                        <p>Known for:</p>
                        <ul>
                            {character.known_for.map(movie => (
                                <li key={movie.id}>
                                    {movie.title} ({movie.release_date})
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterMovies;
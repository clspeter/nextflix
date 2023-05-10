import React, { useEffect } from 'react'
import axios from './api/axios'
import requests from './api/requests'
import './Banner.css'

function Banner() {

    const [movie, setMovie] = React.useState([])
    const [poster, setPoster] = React.useState('')
    const truncate = (string, n) => string?.length > n ? string.substring(0, n - 1) + "..." : string

    useEffect(() => {
        async function fetchMovie() {
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )
            return request
        }
        fetchMovie()
    }, [])

    useEffect(() => {
        if (!movie.backdrop_path) return
        setPoster(`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`)
    }, [movie])


    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(${poster})`,
                backgroundPosition: "center 0%",
                backgroundRepeat: "no-repeat"
            }}>
            <img
                className="banner_poster_size"
                src={poster}
                alt="movie banner" />
            <div className="banner_contents">
                <h1 className="banner_title">{movie.name}</h1>
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                <h1 className="banner_description">{truncate(movie.overview, 250)}</h1>
            </div>
            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner
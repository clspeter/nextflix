import React from 'react'
import './Row.css'
import axios from '../api/axios'
import PropTypes from 'prop-types'

Row.propTypes = {
    title: PropTypes.string.isRequired,
    fetchUrl: PropTypes.string.isRequired,
    isLargeRow: PropTypes.bool
}

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = React.useState([])
    const [poster, setPoster] = React.useState('')
    const base_url = "https://image.tmdb.org/t/p/original/"

    React.useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl])

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {movies.map(movie => (
                    (isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                        <img
                            key={movie.id}
                            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        ></img>
                    ))}
            </div>
        </div >
    )
}

export default Row;
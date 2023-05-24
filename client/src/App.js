import React, { useState } from 'react'
import Loading from './components/Loading'

const App = () => {
    const [url, setURL] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setURL('')
        setLoading(true)
        //👇🏻 Calls the function.
        sendURL()
    }

    const sendURL = async () => {
        try {
            const request = await fetch('http://localhost:4000/api/url', {
                method: 'POST',
                body: JSON.stringify({ url }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const data = request.json()
            //👇🏻 toggles the loading state if the request is successful
            if (data.message) {
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="home">
            <form className="home__form">
                <h2>Website Aggregator</h2>
                <label htmlFor="url">Provide the website URL</label>
                <input
                    type="url"
                    name="url"
                    id="url"
                    value={url}
                    onChange={(e) => setURL(e.target.value)}
                />
                <button onClick={handleSubmit}>ADD WEBSITE</button>
            </form>
        </div>
    )
}
export default App

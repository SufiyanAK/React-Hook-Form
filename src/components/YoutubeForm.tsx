const YoutubeForm = () => {
    return (
        <div className="formBody">
            <form className="form">
                <label className="label" htmlFor="username">Username</label>
                <input className="input" id="username" name="username" type="text" />

                <label className="label" htmlFor="email">Email</label>
                <input className="input" id="email" name="email" type="text" />

                <label className="label" htmlFor="channel">Channel</label>
                <input className="input" id="channel" name="channel" type="text" />

                <button className="submitBtn">Submit</button>
            </form>
        </div>
    )
}

export default YoutubeForm
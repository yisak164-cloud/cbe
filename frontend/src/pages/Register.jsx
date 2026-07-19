
function Register() {
    const handleSubmit = (event) => {
        event.preventDefault()
    }
    function handleUserName(e) {
        console.log("typing", e.target.value)
    }
    return (
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <input onChange={handleUserName} type='text' placeholder='User name'></input>
                </div>
                <div>
                    <input type='email' placeholder='Enter your email'></input>
                </div>
                <div>
                    <input type='password' placeholder='Enter your Password'></input>
                </div>
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register

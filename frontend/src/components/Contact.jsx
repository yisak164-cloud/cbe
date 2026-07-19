import { CheckCheck } from "lucide-react"
function Contact(props) {
    console.log(props)
    return (
        <div>
            {props.users.map((u, index) => <div key={index} className="contact">
                <div className="profile">{u.firstName[0]}{u.lastName[0]}</div>
                <div className="name-message">
                    <div className="top">
                        <b>{u.firstName} {u.lastName}</b>
                        <small>
                            <CheckCheck />
                        </small>
                    </div>
                    <div className="bottom">Bottom</div>
                </div>
            </div>)}
        </div>
    )
}
export default Contact
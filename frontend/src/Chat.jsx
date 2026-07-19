
import { users } from "./Users.js"
import { CheckCheck } from "lucide-react"
import "./styles/Chat.css"
import Contact from "./components/Contact.jsx"
function Chat() {
    return (
        <div className="container">

            <div className="left">

                <Contact users={users}  ></Contact>
            </div>
            <div className="right">Right</div>

            {/* {
        users.map((u) => <div>
          {u.name}
        </div>
        )
      } */}
        </div>
    )


}

export default Chat

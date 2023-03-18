import "../assets/css/header.css"

const Header = (props) => {
    return (
        <div className="header">
            <label className="heading">MEMORIES</label>
            <div className="usr-details">
                <label className="usrname-text">{ props.usrName }</label>
            </div>
        </div>
    )
}

export default Header
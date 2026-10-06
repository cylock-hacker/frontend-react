
const sidebarstyle = {
    top: "0",
    left: "0",
    backgroundColor: "black",
    color: "white",
    width: "140px",
    height: "100vh",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    position: "fixed",
    zIndex: "1000",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
 

}
const ulcontainer ={
   display: "block",
     
}
const liitem = {
    display:"flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    listStyleType:"none",
}
const buttonstyle = {
    Margin:"auto",
    marginTop: "20px",
    backgroundColor: "grey",
    color: "white",
    borderRadius: "5px",
    padding: "10px",
    border: "none",
    cursor: "pointer",
    width: "100%",
}
const linkstyle = {
    textDecoration: "none",
    color: "white"
}
const titlestyle = {
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    padding: "20px",
    color: "white"
}
const  footer = {
    position: "fixed",
    bottom: "5px", 
    padding: "10px",
    width: "140px",
    textAlign: "center",
    backgroundColor: "black",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "50px"

}
function Sidebar(){

    return(
        <aside  style={sidebarstyle} >
            <div style={titlestyle}>URUGENDO-ERP</div>
            <hr />
            <div className="sidebarcontainer">
                <ul style={ulcontainer}>
                    <li style={liitem}>
                        <div style={buttonstyle}><a href="/" style={linkstyle}>Dashboard</a></div>
                        <div style={buttonstyle}><a href="/inventory" style={linkstyle}>Inventory</a></div>
                        <div style={buttonstyle}><a href="/stock" style={linkstyle}>Stock</a></div>
                        <div style={buttonstyle}><a href="/stock-update" style={linkstyle}>Stock Update</a></div>
                        <div style={buttonstyle}><a href="/orders" style={linkstyle}>Orders</a></div>
                    </li>
                </ul>
            </div>
              <button style={footer}><span>Logout</span></button>
        </aside>
    )
}

export default Sidebar;
import NavBar from "../components/Navbar.jsx";
import "../styles/Dashboard.css";
import DirectoryTable from "../components/DirectoryTable.jsx";


const Main = () => (
    // <>
    //     <div className="main-home">
    //         <NavBar />
    //         <div className="dash-body">
    //             <div className="dash-header">
    //                 <h1>Directory</h1>
    //             </div>
    //             <div className="directory-body">
    //                 <div className="directory-column">
    //                     <div className="directory-row legend">
    //                         <span className="field name"> Name </span>
    //                         <span className="field status"> Status </span>
    //                         <span className="field phone"> Phone </span>
    //                         <span className="field address"> Address </span>
    //                         <span className="field email"> Email </span>
    //                     </div>
                        
    //                     { students.map((item, index) => {
    //                         return(
    //                             <DirectoryRow entry={item} index={index}/>
    //                         )
    //                     }) }

    //                     {/* <DirectoryRow entry={entry} />
    //                     <DirectoryRow entry={entry2} oddrow={true}/> */}
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </>
    <>
        <div className="main-home">
            <NavBar/>
            <div className="dash-body">
                <div className="dash-header">
                    <h1> Directory </h1>
                </div>
                <div className="directory-body">
                    <DirectoryTable/>
                </div>
                
            </div>
        </div>
    </>
);

export default Main;
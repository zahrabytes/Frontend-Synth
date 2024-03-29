import React from 'react'

function AdminLists() {
    return (
        <div className="adminlists">
            <h2 className="title">
                The list <span> 12 reports</span>
            </h2>
            <div className= "reportsContainer">
                <div className="reports">
                    <div className="report">
                        <div className="imgBox">
                            <img src="" alt=""/>
                        </div>
                    <div className="section">
                        <p className="albumName">
                            name
                            <span className="spanArtist"> Artist Name</span>
                        </p>
                        <div className="removereject">
                            <div className="RemoveContent">
                                Remove Content
                            </div>
                            <div className="RejectReport">
                                Reject Report
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export { AdminLists }

import React from 'react'

function AdminLists() {
    return (
        <div className="adminlists">
            <h2 className="title">
                Reports <span> 12 reports</span>
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

/*
import React from 'react';

function AdminLists({ notifications }) {
    return (
        <div className="adminlists">
            <h2 className="title">
                Reports <span>{notifications.length} reports</span>
            </h2>
            <div className="reportsContainer">
                {notifications.map(notification => (
                    <div key={notification.id} className="reports">
                        <div className="report">
                            <div className="imgBox">
                                <img src={notification.albumPhoto} alt="Album Cover"/>
                            </div>
                            <div className="section">
                                <p className="albumName">
                                    {notification.songName}
                                    <span className="spanArtist"> {notification.artistName}</span>
                                </p>
                                <div className="removereject">
                                    <div className="RemoveContent" onClick={() => handleRemoveContent(notification.id)}>
                                        Remove Content
                                    </div>
                                    <div className="RejectReport" onClick={() => handleRejectReport(notification.id)}>
                                        Reject Report
                                      </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export { AdminLists };*/
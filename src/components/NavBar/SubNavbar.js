import React from 'react'
import { Link } from 'react-router-dom'

const SubNavbar = () => {
    return (
            <div className="nav-scroller bg-white shadow-sm">
            <nav className="nav nav-underline">
                <Link className="nav-link active" to="#">Dashboard</Link>
                <a className="nav-link" href="#Lures">Señuelos</a>
                <a className="nav-link" href="#Reels">Carretes</a>
                <a  className="nav-link" href="#Rods">Cañas de pescar</a>
                <a  className="nav-link" href="#Lines">Lineas</a>
                <a  className="nav-link" href="#Baits">Anzuelos</a>
                <Link className="nav-link" to="#">Link</Link>
                <Link className="nav-link" to="#">Link</Link>
            </nav>
            </div>
    )
}

export default SubNavbar

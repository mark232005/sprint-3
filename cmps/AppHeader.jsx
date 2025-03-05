const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="app-header">
            <Link to="/">
                <h3>ALUF APPS</h3>
            </Link>

            <div className="nav-hamburger" onClick={toggleMenu}>
                ☰
            </div>

            <nav className={isMenuOpen ? 'open' : ''}>
                <NavLink to="/" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>About</NavLink>
                <NavLink to="/mail" onClick={() => setIsMenuOpen(false)}>Mail</NavLink>
                <NavLink to="/note" onClick={() => setIsMenuOpen(false)}>Note</NavLink>
            </nav>
        </header>
    )
}

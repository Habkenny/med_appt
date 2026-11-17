
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, HeartPulse, Search, CalendarCheck } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navigation */}
      <header className="topbar">
        <nav className="navbar container">
          <Link to="/" className="brand">
            <HeartPulse size={28} />
            <span>StayHealthy</span>
          </Link>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`nav-links ${menuOpen ? "active" : ""}`}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/appointments" onClick={() => setMenuOpen(false)}>
              Appointments
            </Link>
            <Link to="/health-blog" onClick={() => setMenuOpen(false)}>
              Health Blog
            </Link>
            <Link to="/reviews" onClick={() => setMenuOpen(false)}>
              Reviews
            </Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link
              to="/signup"
              className="nav-signup"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Homepage Hero */}
      <main>
        <section className="hero">
          <div className="hero-content container">
            <div className="hero-text">
              <p className="hero-eyebrow">YOUR HEALTH, OUR PRIORITY</p>

              <h1>
                Your Health,
                <br />
                Our <span>Responsibility</span>
              </h1>

              <p className="hero-description">
                Take control of your health journey. Find healthcare
                professionals, explore available appointments, and access
                helpful health information.
              </p>

              <div className="hero-actions">
                <Link to="/appointments" className="btn btn-primary">
                  <CalendarCheck size={18} />
                  Book an Appointment
                </Link>

                <Link to="/appointments" className="btn btn-secondary">
                  <Search size={18} />
                  Find a Doctor
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Navbar;

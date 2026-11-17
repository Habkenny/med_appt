import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-content">

          <p className="hero-subtitle">
            WELCOME TO STAYHEALTHY
          </p>

          <h1>
            Your Health,
            <span> Our Responsibility.</span>
          </h1>

          <p className="hero-description">
            Explore a frontend demo with sample doctor profiles
            and healthcare information.
          </p>

          <p className="hero-description">
            The profiles and forms are fictional examples;
            no appointments or accounts are created.
          </p>

          <Link to="/signup" className="get-started-btn">
            Get Started →
          </Link>

        </div>
      </section>
    </main>
  )
}

export default HomePage
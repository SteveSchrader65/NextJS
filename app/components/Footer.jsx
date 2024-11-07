'use client'

import Link from "next/link"
import styles from "./styles/footer.module.css"

const Footer = () => {
  const ICONS = {
    FACEBOOK: "fab fa-facebook-f",
    TWITTER: "fab fa-twitter",
    GOOGLE: "fab fa-google",
    PINTEREST: "fab fa-pinterest",
    YOUTUBE: "fab fa-youtube",
    RSS: "fas fa-rss",
  };

  const IconChar = ({ icon }) => {
    return <i className={`${icon}`}></i>;
  };

  return (
    <footer className="w-100 font-sans-serif" style={{marginTop: "20vh"}}>
      <div
        className="position-relative d-flex justify-content-between align-items-center m-0 p-3"
        style={{
          fontSize: "0.9rem",
          backgroundColor: "#bec3c7",
        }}>
        <p style={{paddingLeft: "5%"}}>&copy;{new Date().getFullYear()} Steve Schrader</p>
        <div style={{paddingRight: "5%"}}>
          {Object.keys(ICONS).map((icon) => (
            <Link
              key={icon}
              href="#"
              className={`${styles.footerLink} text-decoration-none d-inline-flex align-items-center justify-content-center me-2 border border-black`}
              style={{
                color: "#888888",
                cursor: "pointer",
                borderColor: "#888888",
                height: "2rem",
                width: "2rem",
              }}>
              <IconChar icon={ICONS[icon]} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
};

export default Footer

"use client"

import Link from "next/link"
import Image from "next/image"
import DropdownMenu from "./Dropdown"
import SearchFeature from "./SearchFeature"
import {useStates} from "../hooks/useStates"
import styles from "./styles/header.module.css"

const Header = () => {
  const {states, updateStates} = useStates()

  const dropdownItems = [
    {label: "English", href: "#"},
    {label: "Deutsch", href: "#"},
    {label: "Espanol", href: "#"},
    {label: "Francais", href: "#"},
    {label: "Portugues", href: "#"},
  ]

  const handleLanguageChange = (language) => {
    updateStates("language", language)
    console.log("Selected language:", language)
  }

  const ICONS = {
    LOGIN: "arrow-right-to-bracket",
    REGISTER: "pencil-square",
    GLOBE: "earth-asia",
  }

  const IconChar = ({icon, style}) => {
    return <i className={`fas fa-${icon}`} style={style}></i>
  }

  return (
    <header className="w-100" style={{fontFamily: "Arial, sans-serif", fontSize: "0.95rem"}}>
      <div
        className="position-relative d-flex align-items-center justify-content-end bg-light"
        style={{
          fontSize: "0.8rem",
          height: "1.75rem",
        }}>
        <div className="mr-4">
          <Link
            className={`${styles.navLink} text-decoration-none me-3`}
            style={{color: "#888888"}}
            href="#">
            <IconChar icon={ICONS.LOGIN} style={{marginRight: "5px"}} />
            Login
          </Link>
        </div>
        <Link
          className={`${styles.navLink} text-decoration-none me-2`}
          style={{color: "#888888"}}
          href="#">
          <IconChar icon={ICONS.REGISTER} style={{marginRight: "5px"}} />
          Register
        </Link>
        <div className="border-start border-black border-1 mx-3" style={{height: "1.5rem"}}></div>
        <IconChar icon={ICONS.GLOBE} style={{marginLeft: "25px", marginRight: "5px"}} />
        <div className="position-relative d-inline-block me-5" style={{marginRight: "8rem"}}>
          <DropdownMenu
            items={dropdownItems}
            language={states.language}
            onItemSelect={handleLanguageChange}
          />
        </div>
      </div>
      <nav className="d-flex align-items-center justify-content-between">
        <Link
          className="text-decoration-none"
          style={{color: "#888888", margin: "1% 0 0 9%"}}
          href="/">
          <Image
            style={{height: "5.5rem"}}
            src="/images/logo.png"
            alt="One Ring logo"
            width={200}
            height={100}
            priority
          />
        </Link>
        <Link
          className={`${styles.navLink} text-decoration-none`}
          style={{color: "#888888", margin: "1% 0 0 9%"}}
          href="/rentals">
          FIND A RENTAL
        </Link>
        <Link
          className={`${styles.navLink} text-decoration-none`}
          style={{color: "#888888", margin: "1% 0 0 9%"}}
          href="/regions">
          REGIONS
        </Link>
        <Link
          className={`${styles.navLink} text-decoration-none`}
          style={{color: "#888888", margin: "1% 0 0 9%"}}
          href="/contact">
          CONTACT
        </Link>
        <div className="position-relative d-inline-block ms-auto me-4 px-3">
          <SearchFeature />
        </div>
      </nav>
    </header>
  )
}

export default Header

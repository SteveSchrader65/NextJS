"use client"

import {useState, useEffect, useRef} from "react"
import styles from "./styles/dropdown.module.css"

const DropdownMenu = ({items = [], language = "English", onItemSelect = () => {}}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleMouseEnter = () => {
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  const handleLanguageSelect = (item) => {
    onItemSelect(item.label)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div
      className="dropdown d-inline-block"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{minWidth: "125px"}}>
      <button
        className="btn btn-link text-secondary d-flex px-3 text-decoration-none border-0 align-items-center justify-content-between w-100"
        onClick={handleToggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
        style={{
          fontSize: "0.8rem",
        }}>
        {language}
        <i
          className={`fas fa-caret-down ms-2 ${isOpen ? "fa-rotate-180" : ""}`}
          style={{fontSize: "0.8rem", transition: "transform 0.3s ease"}}></i>
      </button>
      <div
        className={`dropdown-menu dropdown-menu-end w-100 rounded-0 bg-light fs-6 ${styles.dropdownContent} ${
          isOpen ? styles.open : ""
        }`}
        role="menu"
        aria-label="Language selection menu"
        style={{
          minWidth: "125px",
          backgroundColor: "#f3f3f3",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          display: isOpen ? "block" : "none",
        }}>
        {items
          .filter((item) => item.label !== language)
          .map((item, index) => (
            <button
              className="dropdown-item text-secondary text-decoration-none"
              key={index}
              role="menuitem"
              onClick={(e) => {
                e.preventDefault()
                handleLanguageSelect(item)
              }}
              style={{
                padding: "0.6rem 1rem",
                transition: "all 0.3s ease",
                border: "none",
                background: "none",
                width: "100%",
              }}>
              {item.label}
            </button>
          ))}
      </div>
    </div>
  )
}

export default DropdownMenu

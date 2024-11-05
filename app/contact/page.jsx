"use client"

import {useState} from "react"
import {useStates} from "../hooks/useStates"

export default function Contact() {
  const {states} = useStates()

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    country: "",
    email: "",
    phone: "",
    enquiryType: "",
    comment: "",
  })

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(
      `Current City: ${states.city}\n
      Language: ${states.language}\n
      Name: ${formData.name}\n
      Role: ${formData.role}\n
      Country: ${formData.country}\n
      E-mail: ${formData.email}\n
      Phone: ${formData.phone}\n
      Enquiry: ${formData.enquiryType}\n
      Comment: ${formData.comment}`
    )
  }

  const ICONS = {
    USER: "user-tie",
    CLIPBOARD: "clipboard-question",
  }

  const IconChar = ({icon}) => {
    return <i className={`fas fa-${icon} fs-1 me-1`}></i>
  }

  return (
    <>
      <h2 className="bg-dark text-light d-inline-block w-100 fw-bold py-2 ps-5 fs-10">
        Contact Page
      </h2>
      <div className="mt-4">
        <form className="container w-75 mx-auto gap-3">
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <h3 className="fs-4 text-primary mb-3">
                <IconChar icon={ICONS.USER} />
                About you
              </h3>
              <div className="mb-5">
                <label className="d-block mb-2 fw-bold" htmlFor="name">
                  Please, introduce yourself ...
                </label>
                <input
                  className="p-2 border-1"
                  style={{width: "60%"}}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name ..."
                  required
                  aria-label="Enter your name"
                  aria-required="true"
                />
              </div>
              <div className="mb-3">
                <label className="d-block mb-2 fw-bold">You are a ...</label>
                <div id="groupOne">
                  {["tenant/potential tenant", "owner", "investor", "broker"].map((role) => (
                    <label className="d-flex align-items-center gap-2 mb-2" key={role}>
                      <input
                        type="radio"
                        id={role}
                        name="role"
                        value={role}
                        checked={formData.role === role}
                        onChange={handleChange}
                        required
                        aria-label="Select your position"
                      />
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <h3 className="fs-4 text-primary mb-3 invisible" style={{height: "15%"}}></h3>
              <div className="mb-3">
                <label className="d-block mb-2 fw-bold" htmlFor="country">
                  You live in ...
                </label>
                <select
                  className="p-2 border-1"
                  style={{width: "60%"}}
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  aria-label="Select your Home country"
                  aria-required="true">
                  <option value="">Select Country</option>
                  {[
                    "Australia",
                    "Brazil",
                    "Chile",
                    "Japan",
                    "Morocco",
                    "United Kingdom",
                    "United States",
                  ].map((country) => (
                    <option key={country} value={country.toLowerCase()}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="d-block mb-2 fw-bold" htmlFor="email">
                  Your e-mail address is ...
                </label>
                <input
                  className="p-2 border-1 rounded"
                  style={{width: "60%"}}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail ..."
                  required
                  aria-label="Enter your e-mail address"
                  aria-required="true"
                />
              </div>
              <div className="mb-3">
                <label className="d-block mb-2 fw-bold" htmlFor="phone">
                  Your telephone number is ...
                </label>
                <input
                  className="p-2 border-1"
                  style={{width: "35%"}}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telephone ..."
                  required
                  aria-label="Enter your telephone number"
                  aria-required="true"
                />
              </div>
            </div>
            <div className="flex-grow-1 flex-shrink-1 flex-basis-100">
              <h3 className="fs-4 text-primary mb-3" style={{height: "15%"}}></h3>
            </div>
          </div>
          <div className="row">
            <div className="flex-grow-1 flex-shrink-1 flex-basis-100">
              <h3 className="fs-4 text-primary mb-3">
                <IconChar icon={ICONS.CLIPBOARD} />
                Your enquiry details
              </h3>
              <label className="d-block mb-2 fw-bold">What would you like to know about ??</label>
              <div className="d-flex flex-wrap mt-2 mb-5" id="groupTwo">
                {["property", "advert", "general", "report"].map((type) => (
                  <label className="d-flex align-items-center gap-2" key={type}>
                    <input className="ms-5"
                      type="radio"
                      id={type}
                      name="enquiryType"
                      value={type}
                      checked={formData.enquiryType === type}
                      onChange={handleChange}
                      aria-label="Select your enquiry type"
                    />
                    {type === "property"
                      ? "Property listing"
                      : type === "advert"
                      ? "Advertising"
                      : type === "general"
                      ? "General enquiry"
                      : "Report problem"}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="flex-grow-1 flex-shrink-1 flex-basis-100">
                <div className="mb-3">
                  <label className="d-block mb-2 fw-bold" htmlFor="comment">
                    Comments:
                  </label>
                  <textarea
                    className="w-100 p-2 border-1"
                    style={{resize: "vertical"}}
                    id="comment"
                    name="comment"
                    rows="4"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder="Any comments?"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <button
                className="formSubmit btn btn-primary text-white p-2 rounded border-0 fs-6"
                style={{cursor: "pointer", width: "25%" }}
                type="submit"
                onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

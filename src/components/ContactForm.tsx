'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    budget: ''
  })

  const budgetOptions = [
    { value: '', label: 'tu presupuesto', disabled: true },
    { value: 'menos-20k', label: 'Menos de $20,000' },
    { value: 'hasta-100k', label: 'Hasta $100,000' },
    { value: 'mas-100k', label: 'Más de $100,000' }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="tu nombre"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu correo electrónico"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="tu teléfono"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <textarea
          name="project"
          value={formData.project}
          onChange={handleChange}
          placeholder="tu proyecto&#10;qué es | qué persigues | en qué te podemos ayudar"
          className="form-textarea"
          rows={5}
          required
        />
      </div>

      <div className="form-group">
        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="form-select"
          required
        >
          {budgetOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="form-submit">
        ENVIAR
      </button>
    </form>
  )
}

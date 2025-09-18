'use client'

import { useState } from 'react'
import ContactForm from './ContactForm'

export default function ContactTabs() {
  const [activeTab, setActiveTab] = useState('agenda')

  return (
    <div className="contact-tabs">
      <div className="tabs-header">
        <button 
          className={`tab-button ${activeTab === 'agenda' ? 'active' : ''}`}
          onClick={() => setActiveTab('agenda')}
        >
          agenda tu llamada
        </button>
        <div className="tab-separator">|</div>
        <button 
          className={`tab-button ${activeTab === 'cuéntanos' ? 'active' : ''}`}
          onClick={() => setActiveTab('cuéntanos')}
        >
          cuéntanos tu reto
        </button>
      </div>

      <div className="tabs-content">
        {activeTab === 'agenda' && (
          <div className="tab-content">
            <div className="calendly-container">
              {/* Calendly embed will go here */}
              <div className="calendly-placeholder">
                <p>Calendly component will be integrated here</p>
                <p>Please provide your Calendly embed URL</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cuéntanos' && (
          <div className="tab-content">
            <ContactForm />
          </div>
        )}
      </div>
    </div>
  )
}
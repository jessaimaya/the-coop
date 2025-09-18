'use client'

import { useState } from 'react'

interface AccordionItem {
  pregunta: string
  respuesta: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <div 
            className="accordion-header" 
            onClick={() => toggleItem(index)}
          >
            <h3 className="accordion-question">{item.pregunta}</h3>
            <span className={`accordion-icon ${openIndex === index ? 'open' : ''}`}>
              {openIndex === index ? '−' : '+'}
            </span>
          </div>
          <div className={`accordion-content ${openIndex === index ? 'open' : ''}`}>
            <div className="accordion-answer">
              <p>{item.respuesta}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
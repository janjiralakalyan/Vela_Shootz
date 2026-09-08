import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { INITIAL_FAQS } from '../data/initialData';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq-section" style={{ padding: '2.4rem 0 2.2rem 0', backgroundColor: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container-narrow" style={{ maxWidth: '780px' }}>
        
        {/* COMPACT SECTION HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 1.4rem auto' }}>
          <span
            style={{
              display: 'inline-block',
              color: 'var(--gold-primary)',
              fontSize: '0.72rem',
              fontWeight: '800',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '0.25rem'
            }}
          >
            QUESTIONS & ANSWERS
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.35rem, 2.2vw, 1.75rem)',
              lineHeight: 1.18,
              marginBottom: '0.35rem',
              color: '#FFF'
            }}
          >
            FREQUENTLY ASKED <br />
            <span className="gold-gradient-text">Questions.</span>
          </h2>
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              lineHeight: '1.45',
              maxWidth: '520px',
              margin: '0 auto'
            }}
          >
            Everything you need to know about our iPhone workflow, turnaround times, and booking policies.
          </p>
        </div>

        {/* COMPACT ACCORDION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {INITIAL_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: 0,
                  borderRadius: '12px',
                  border: isOpen ? '1px solid var(--gold-primary)' : '1px solid var(--gold-border)',
                  backgroundColor: 'rgba(34, 0, 11, 0.8)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: isOpen ? '0 6px 20px rgba(0, 0, 0, 0.6), 0 0 12px rgba(229, 173, 54, 0.15)' : '0 4px 14px rgba(0, 0, 0, 0.4)',
                  overflow: 'hidden',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  style={{
                    width: '100%',
                    padding: '0.95rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.85rem',
                    textAlign: 'left',
                    color: isOpen ? 'var(--gold-primary)' : '#FFF',
                    fontWeight: '700',
                    fontSize: '0.92rem',
                    transition: 'color 0.2s ease',
                    background: 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  <span>{faq.question}</span>
                  <div
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease',
                      color: 'var(--gold-primary)',
                      flexShrink: 0
                    }}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0.65rem 1.25rem 1rem 1.25rem',
                      color: 'var(--text-muted)',
                      fontSize: '0.82rem',
                      lineHeight: '1.55',
                      borderTop: '1px solid rgba(229, 173, 54, 0.1)'
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}


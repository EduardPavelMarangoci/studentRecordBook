import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <>
    <footer className="footer">
     <div className="footer-container">
      <div className="footer-row">
        <div className="footer-col">
          <h4>Libretto universitario</h4>
            <p>
              Il libretto universitario che tutti vogliono avere.
              Qui potrai inserire tutti i tuoi esami universitari e tenere traccia
              delle statistiche come calcolare la media, quanti esami superati con 30 e sotto, quante
              bocciature.
            </p>
        </div>
        <div className="footer-col links-col">
          <h4>Collegamenti</h4>
          <ul>
            <li><Link to={'/'} className='links'>Inserisci voti</Link></li>
            <li><Link to={'/listaEsami'} className='links'>Visualizza esami</Link></li>
          </ul>
        </div>
        <div className="footer-col contacts">
          <h4>Contatti</h4>
          <div className="social-links">
            <p>Eduard Pavel Marangoci</p>  
            <p className="redirect">
              <a className="location" href="https://goo.gl/maps/9BF8Y5GW7tv1YfgJ6" target="_blank" rel="noreferrer">
              Lungo Dora, 100 - 10153 Turin 
              </a>
            </p>
          </div>
        </div>
      </div>
     </div>
  </footer>
    </>
  )
}

export default Footer;
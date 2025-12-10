

import './contact.styles.scss';
const Contact = () => {
  return (
    <div className="contact-page">
      <div className="header-container">
        <h1>🥐 El Horno de Gracia 🥐</h1>
        <h2>Panadería y Pastelería Artesanal</h2>
      </div>
      <div className="message-container">
        <p className="intro-text">
          ¡Gracias por querer contactarnos! Hornear en el corazón de Gracia es nuestra pasión. Ya sea para hacer un pedido especial, preguntar por nuestros talleres o simplemente saludar, estamos a tu disposición.
        </p>

        <div className="contact-details">
          <h3>📍 Encuéntranos</h3>
          <p>Carrer de la Llibertat, 45, 08012 Barcelona</p>
          <a 
            href="https://www.google.com/maps/place/Gracia,+Barcelona" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cta-link map-link"
          >
            Ver en el mapa
          </a>
          
          <h3>📞 Llámanos</h3>
          <p>+34 93 555 1234</p>
          
          <h3>🕒 Horario</h3>
          <p>
            Lunes a Sábado: 8:00h - 20:00h<br />
            Domingos: Cerrado
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

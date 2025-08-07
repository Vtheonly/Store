// src/pages/InfoPage.jsx
import React, { useState, useEffect } from "react";
import Icon from "../components/Icons/Icon";
import { Shirt, Truck, Phone } from "lucide-react";
import "./InfoPage.css";

const InfoPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'delivery', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    alert("Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="info-page">
      <div className="info-container">
        {/* Hero Section */}
        <header className="info-hero">
          <h1>StyleShop - Votre Destination Mode</h1>
          <p>Découvrez tout ce que vous devez savoir sur StyleShop</p>
          <div className="hero-nav">
            <a href="#about" className="hero-nav-link">À Propos</a>
            <a href="#delivery" className="hero-nav-link">Livraison</a>
            <a href="#contact" className="hero-nav-link">Contact</a>
          </div>
        </header>

        {/* About Section */}
        <section className="info-section about-section" id="about">
          <div className="section-header">
            <h2>À Propos de StyleShop</h2>
            <p>Votre destination mode en Algérie</p>
          </div>

          <div className="story-content">
            <div className="story-text">
              <h3>Notre Histoire</h3>
              <p>
                Fondé en 2020, StyleShop est né de la passion pour la mode et du désir 
                d'offrir aux algériens des vêtements et accessoires de qualité à des prix 
                accessibles. Notre équipe, composée de passionnés de mode, sélectionne 
                soigneusement chaque produit pour vous garantir style, qualité et satisfaction.
              </p>
              <p>
                Depuis nos débuts, nous avons servi plus de 5000 clients satisfaits à travers 
                l'Algérie, en nous concentrant sur l'excellence du service client et la qualité 
                de nos produits mode.
              </p>
            </div>
            <div className="story-visual">
              <div className="image-placeholder">
                <Shirt size={48} color="#667eea" />
                <p>Mode & Style</p>
              </div>
            </div>
          </div>

          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <Icon name="Target" size={48} color="#667eea" />
              </div>
              <h4>Qualité</h4>
              <p>Sélectionner uniquement des produits de haute qualité qui résistent au temps et aux tendances.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <Icon name="DollarSign" size={48} color="#667eea" />
              </div>
              <h4>Prix Accessibles</h4>
              <p>Offrir des prix compétitifs sans compromis sur la qualité, pour une mode accessible à tous.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <Icon name="Rocket" size={48} color="#667eea" />
              </div>
              <h4>Service Client</h4>
              <p>Fournir un service client exceptionnel avec des conseils personnalisés et un suivi attentif.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">
                <Icon name="Star" size={48} color="#667eea" />
              </div>
              <h4>Tendances</h4>
              <p>Rester à la pointe des tendances pour vous proposer les dernières nouveautés mode.</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Clients Satisfaits</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Produits en Stock</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">48</div>
              <div className="stat-label">Wilayas Desservies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.8/5</div>
              <div className="stat-label">Note Moyenne</div>
            </div>
          </div>
        </section>

        {/* Delivery Section */}
        <section className="info-section delivery-section" id="delivery">
          <div className="section-header">
            <h2>Informations de Livraison</h2>
            <p>Découvrez nos options de livraison et nos délais</p>
          </div>

          <div className="delivery-zones">
            <div className="zone-card">
              <h4>Alger Centre</h4>
              <p>Livraison gratuite pour toute commande</p>
              <span className="delivery-time">24-48h</span>
            </div>
            <div className="zone-card">
              <h4>Grand Alger</h4>
              <p>Frais de livraison : 300 DA</p>
              <span className="delivery-time">2-3 jours</span>
            </div>
            <div className="zone-card">
              <h4>Autres Wilayas</h4>
              <p>Frais de livraison : 500-800 DA</p>
              <span className="delivery-time">3-5 jours</span>
            </div>
          </div>

          <div className="delivery-options">
            <div className="option-card">
              <h4>
                <Truck size={20} color="#667eea" style={{ display: 'inline', marginRight: '8px' }} />
                Livraison Standard
              </h4>
              <ul>
                <li>Livraison à domicile</li>
                <li>Suivi de commande par SMS</li>
                <li>Possibilité de reporter la livraison</li>
                <li>Créneau de livraison flexible</li>
              </ul>
            </div>
            <div className="option-card">
              <h4>⚡ Livraison Express</h4>
              <ul>
                <li>Livraison en 24h (Alger uniquement)</li>
                <li>Suivi en temps réel</li>
                <li>Créneau de 2h au choix</li>
                <li>Supplément de 200 DA</li>
              </ul>
            </div>
          </div>

          <div className="schedule-info">
            <h4>Horaires de Livraison</h4>
            <div className="schedule-grid">
              <div className="schedule-item">
                <strong>Lundi - Jeudi :</strong>
                <span>9h00 - 17h00</span>
              </div>
              <div className="schedule-item">
                <strong>Vendredi :</strong>
                <span>9h00 - 12h00 / 14h00 - 17h00</span>
              </div>
              <div className="schedule-item">
                <strong>Samedi :</strong>
                <span>9h00 - 15h00</span>
              </div>
              <div className="schedule-item">
                <strong>Dimanche :</strong>
                <span>Pas de livraison</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="info-section contact-section" id="contact">
          <div className="section-header">
            <h2>Contactez-Nous</h2>
            <p>Nous sommes là pour vous aider et répondre à toutes vos questions</p>
          </div>

          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">
                <Icon name="Phone" size={48} color="#667eea" />
              </div>
              <h4>Téléphone</h4>
              <p>+213 770 123 456</p>
              <span className="contact-hours">Lun-Sam: 9h-18h</span>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <Icon name="MessageCircle" size={48} color="#25d366" />
              </div>
              <h4>WhatsApp</h4>
              <p>+213 770 123 456</p>
              <span className="contact-hours">Réponse rapide 24/7</span>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <Icon name="Mail" size={48} color="#667eea" />
              </div>
              <h4>Email</h4>
              <p>contact@styleshop.dz</p>
              <span className="contact-hours">Réponse sous 24h</span>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">
                <Icon name="MapPin" size={48} color="#667eea" />
              </div>
              <h4>Adresse</h4>
              <p>Alger Centre, Algérie</p>
              <span className="contact-hours">Showroom sur RDV</span>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h3>Envoyez-nous un Message</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nom Complet *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Sujet *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Choisir un sujet</option>
                    <option value="commande">Question sur une commande</option>
                    <option value="produit">Information produit</option>
                    <option value="livraison">Livraison</option>
                    <option value="retour">Retour/Échange</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Décrivez votre demande en détail..."
                  required
                />
              </div>
              
              <button type="submit" className="submit-button">
                Envoyer le Message
              </button>
            </form>
          </div>

          <div className="faq-section">
            <h3>Questions Fréquentes</h3>
            <div className="faq-grid">
              <div className="faq-item">
                <h4>Comment passer une commande ?</h4>
                <p>Parcourez notre catalogue, ajoutez vos articles favoris et contactez-nous via WhatsApp pour finaliser votre commande.</p>
              </div>
              <div className="faq-item">
                <h4>Quels sont les délais de livraison ?</h4>
                <p>24-48h pour Alger Centre, 2-3 jours pour le Grand Alger, et 3-5 jours pour les autres wilayas.</p>
              </div>
              <div className="faq-item">
                <h4>Puis-je échanger un article ?</h4>
                <p>Oui, vous avez 7 jours pour échanger un article non porté avec ses étiquettes d'origine.</p>
              </div>
              <div className="faq-item">
                <h4>Comment connaître ma taille ?</h4>
                <p>Consultez notre guide des tailles ou contactez-nous pour des conseils personnalisés.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <h2>Rejoignez la Communauté StyleShop</h2>
          <p>Découvrez nos dernières collections mode et bénéficiez d'offres exclusives.</p>
          <div className="cta-buttons">
            <a href="/" className="cta-button primary">Découvrir nos Produits</a>
            <div className="social-links">
              <div className="social-link">
                <span className="social-icon">
                  <Icon name="Facebook" size={24} color="#1877f2" />
                </span>
                <span>Facebook</span>
              </div>
              <div className="social-link">
                <span className="social-icon">
                  <Icon name="Instagram" size={24} color="#e4405f" />
                </span>
                <span>Instagram</span>
              </div>
              <div className="social-link">
                <span className="social-icon">
                  <Icon name="MessageCircle" size={24} color="#25d366" />
                </span>
                <span>WhatsApp</span>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Navigation */}
        <div className="floating-nav">
          <a 
            href="#about" 
            className={`floating-nav-item ${activeSection === 'about' ? 'active' : ''}`}
            title="À Propos"
          >
            <Shirt size={20} color="currentColor" />
          </a>
          <a 
            href="#delivery" 
            className={`floating-nav-item ${activeSection === 'delivery' ? 'active' : ''}`}
            title="Livraison"
          >
            <Truck size={20} color="currentColor" />
          </a>
          <a 
            href="#contact" 
            className={`floating-nav-item ${activeSection === 'contact' ? 'active' : ''}`}
            title="Contact"
          >
            <Phone size={20} color="currentColor" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
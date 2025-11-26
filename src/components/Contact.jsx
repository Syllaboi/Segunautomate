import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const { content } = useContent();
    const { contact } = content;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send this to a backend
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="section">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>

                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Let's Connect</h3>
                        <p>
                            I'm always interested in hearing about new projects and opportunities.
                            Whether you have a question or just want to say hi, feel free to reach out!
                        </p>

                        <div className="contact-details">
                            <div className="contact-detail">
                                <Mail size={24} />
                                <div>
                                    <h4>Email</h4>
                                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                </div>
                            </div>

                            <div className="contact-detail">
                                <Phone size={24} />
                                <div>
                                    <h4>Phone</h4>
                                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                                </div>
                            </div>

                            <div className="contact-detail">
                                <MapPin size={24} />
                                <div>
                                    <h4>Location</h4>
                                    <p>{contact.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form card" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Your message..."
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={submitted}>
                            {submitted ? 'Message Sent!' : 'Send Message'}
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;

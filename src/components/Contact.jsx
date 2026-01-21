import { useState } from 'react';
import emailjs from '@emailjs/browser';
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
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        // Get these from your .env file
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            setStatus({
                type: 'error',
                message: 'Email service is not configured. Please contact the administrator.'
            });
            setIsLoading(false);
            return;
        }

        try {
            await emailjs.sendForm(
                serviceId,
                templateId,
                e.target,
                publicKey
            );

            setStatus({ type: 'success', message: 'Message sent successfully! I will get back to you soon.' });
            setFormData({ name: '', email: '', message: '' });
            e.target.reset(); // Reset the native form
        } catch (error) {
            console.error('Email error:', error);
            setStatus({
                type: 'error',
                message: 'Failed to send message. Please try again or email me directly.'
            });
        } finally {
            setIsLoading(false);
            // Clear success message after 5 seconds
            setTimeout(() => {
                if (status.type === 'success') {
                    setStatus({ type: '', message: '' });
                }
            }, 5000);
        }
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
                                name="user_name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Your name"
                                disabled={isLoading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="user_email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your.email@example.com"
                                disabled={isLoading}
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
                                disabled={isLoading}
                            />
                        </div>

                        {status.message && (
                            <div className={`form-status ${status.type}`}>
                                {status.message}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Sending...' : 'Send Message'}
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;

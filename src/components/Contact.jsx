import { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import useScrollReveal from '../utils/useScrollReveal';
import './Contact.css';

const Contact = () => {
    const { content } = useContent();
    const { contact } = content;
    useScrollReveal();

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus({ type: '', message: '' });

        const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
        if (!webhookUrl) {
            setStatus({ type: 'error', message: 'Webhook URL is not configured. Please contact the administrator.' });
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setStatus({ type: 'success', message: 'Message sent! I\'ll get back to you soon.' });
            setFormData({ name: '', email: '', message: '' });
            e.target.reset();
        } catch (error) {
            console.error('Submission error:', error);
            setStatus({ type: 'error', message: 'Failed to send message. Please try again or email me directly.' });
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                if (status.type === 'success') setStatus({ type: '', message: '' });
            }, 5000);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const fieldMap = { 'user_name': 'name', 'user_email': 'email', 'message': 'message' };
        const stateKey = fieldMap[name] || name;
        setFormData({ ...formData, [stateKey]: value });
    };

    const details = [
        { icon: <Mail size={20} />, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
        { icon: <Phone size={20} />, label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
        { icon: <MapPin size={20} />, label: 'Location', value: contact.location, href: null },
    ];

    return (
        <section id="contact" className="section" aria-labelledby="contact-heading" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="global-shader-blob shader-mint" style={{ width: '700px', height: '700px', bottom: '-20%', right: '-10%' }} aria-hidden="true" />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="contact-header reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div className="header-eyebrow" style={{ marginBottom: 'var(--sp-6)' }}>
                        <span className="header-eyebrow-dot" />
                        Contact
                    </div>
                    <h2 id="contact-heading" className="header-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 'var(--sp-4)' }}>
                        <span className="line">Let's work</span>
                        <span className="line line-gradient">Together</span>
                    </h2>
                    <p className="header-subtitle" style={{ margin: '0 auto' }}>
                        Looking to automate your business workflows, build AI agents, or architect
                        a scalable system? I'm available for freelance and remote engagements.
                    </p>
                </div>

                <div className="contact-content">
                    {/* Info side */}
                    <div className="contact-info reveal reveal-delay-1">
                        <h3>Get in touch</h3>
                        <p>
                            Reach out through any of the channels below or use the form
                            and I'll respond within 24 hours.
                        </p>

                        <div className="contact-details">
                            {details.map(({ icon, label, value, href }) => (
                                <div key={label} className="contact-detail">
                                    <div className="contact-detail-icon" aria-hidden="true">
                                        {icon}
                                    </div>
                                    <div>
                                        <h4>{label}</h4>
                                        {href
                                            ? <a href={href}>{value}</a>
                                            : <p>{value}</p>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <form className="contact-form reveal reveal-delay-2" onSubmit={handleSubmit} aria-label="Contact form">
                        <div className="form-row">
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
                                    placeholder="your@email.com"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Tell me about your project..."
                                disabled={isLoading}
                            />
                        </div>

                        {status.message && (
                            <div className={`form-status ${status.type}`} role="alert">
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

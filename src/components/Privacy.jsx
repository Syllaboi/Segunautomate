import { Shield } from 'lucide-react';
import './Privacy.css';

const Privacy = () => {
    return (
        <div className="privacy-page">
            <div className="privacy-header">
                <div className="container">
                    <div className="privacy-icon">
                        <Shield size={48} />
                    </div>
                    <h1>Privacy Policy</h1>
                    <p className="privacy-date">Last updated: November 25, 2024</p>
                </div>
            </div>

            <div className="privacy-content container">
                <div className="privacy-intro">
                    <p>
                        Segunautomate ("us", "we", or "our") operates the salakoexplores-ai.lovable.app website
                        (the "Service"). This page informs you of our policies regarding the collection, use, and
                        disclosure of personal information when you use our Service.
                    </p>
                </div>

                <section className="privacy-section">
                    <h2>1. Information Collection and Use</h2>
                    <p>
                        We collect several different types of information for various purposes to provide and
                        improve our Service to you.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>2. Types of Data Collected</h2>
                    <h3>Personal Data</h3>
                    <p>
                        While using our Service, we may ask you to provide us with certain personally identifiable
                        information that can be used to contact or identify you ("Personal Data"). This may include,
                        but is not limited to, your email address, name, and usage data.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>3. Usage Data</h2>
                    <p>
                        We may also collect information on how the Service is accessed and used ("Usage Data").
                        This Usage Data may include information such as your computer's Internet Protocol address
                        (e.g., IP address), browser type, browser version, the pages of our Service that you visit,
                        the time and date of your visit, the time spent on those pages, unique device identifiers,
                        and other diagnostic data.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>4. Use of Data</h2>
                    <p>Segunautomate uses the collected data for various purposes:</p>
                    <ul>
                        <li>To provide and maintain our Service</li>
                        <li>To notify you about changes to our Service</li>
                        <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                        <li>To provide customer support</li>
                        <li>To gather analysis or valuable information so that we can improve our Service</li>
                        <li>To monitor the usage of our Service</li>
                        <li>To detect, prevent, and address technical issues</li>
                    </ul>
                </section>

                <section className="privacy-section">
                    <h2>5. Data Transfer</h2>
                    <p>
                        Your information, including Personal Data, may be transferred to — and maintained on —
                        computers located outside of your state, province, country, or other governmental jurisdiction
                        where the data protection laws may differ from those of your jurisdiction.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>6. Data Disclosure</h2>
                    <p>We may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
                    <ul>
                        <li>Comply with a legal obligation</li>
                        <li>Protect and defend the rights or property of Segunautomate</li>
                        <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
                        <li>Protect the personal safety of users of the Service or the public</li>
                        <li>Protect against legal liability</li>
                    </ul>
                </section>

                <section className="privacy-section">
                    <h2>7. Data Security</h2>
                    <p>
                        The security of your data is important to us, but remember that no method of transmission
                        over the Internet or method of electronic storage is 100% secure. While we strive to use
                        commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>8. Cookies</h2>
                    <p>
                        We use cookies and similar tracking technologies to track activity on our website and store
                        certain information. You can instruct your browser to refuse all cookies or to indicate when
                        a cookie is being sent.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>9. Children's Privacy</h2>
                    <p>
                        Our services are not directed to individuals under the age of 18. We do not knowingly collect
                        personal information from children. If you become aware that a child has provided us with
                        personal information, please contact us.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>10. Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. We will notify you of any changes by
                        posting the new Privacy Policy on this page and updating the "Last updated" date.
                    </p>
                </section>

                <section className="privacy-section">
                    <h2>11. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy or our privacy practices, please contact us:</p>
                    <div className="contact-box">
                        <p><strong>Segunautomate</strong></p>
                        <p>Email: <a href="mailto:sgnzoe.life@gmail.com">sgnzoe.life@gmail.com</a></p>
                        <p>Location: Lagos, Nigeria</p>
                    </div>
                </section>

                <div className="privacy-footer">
                    <a href="/" className="btn btn-primary">Back to Home</a>
                </div>
            </div>
        </div>
    );
};

export default Privacy;

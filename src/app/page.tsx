'use client';

import React, { useState, FormEvent, JSX, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaChevronDown,
    FaTooth,
    FaSmile,
    FaTeeth,
    FaUser,
    FaCommentDots,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import {getBaseUrl} from "../../utils/getBaseUrl";

interface FAQ {
    q: string;
    a: string;
}

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    img: string;
}

interface Testimonial {
    name: string;
    text: string;
}

interface Service {
    title: string;
    desc: string;
    icon: JSX.Element;
}

export default function Home() {
    const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});
    const [loading, setLoading] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [phone, setPhone] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const toggleFaq = (i: number) => setFaqOpen((s) => ({ ...s, [i]: !s[i] }));

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const faqs: FAQ[] = [
        {
            q: 'How often should I come for teeth cleaning?',
            a: 'We recommend a professional cleaning every 6 months. Patients with gum disease may need more frequent visits.',
        },
        { q: 'Do you provide payment plans?', a: 'Yes — flexible plans for implants and braces. Speak to reception for options.' },
        { q: 'Is dental treatment safe for children?', a: 'Absolutely. We offer family-friendly care and gentle paediatric dentistry services.' },
        {
            q: 'What should I bring for my first visit?',
            a: 'Bring current medications, past dental records if available, and your ID.',
        },
    ];

    const team: TeamMember[] = [
        {
            name: 'Dr. Francis Oduor',
            role: 'Principal Dentist',
            bio: 'BDS (University of Nairobi). 10+ years in restorative and cosmetic dentistry.',
            img: '/male-avatar.jpg',
        },
        {
            name: 'Dr. Aisha Mwangi',
            role: 'Dental Hygienist',
            bio: 'Registered hygienist focused on preventive care and patient comfort.',
            img: '/female-avatar.jpg',
        },
        {
            name: 'Dr. John Karanja',
            role: 'Orthodontic Technician',
            bio: 'Specialist in braces and aligner workflows.',
            img: '/male-avatar.jpg',
        },
    ];

    const testimonials: Testimonial[] = [
        { name: 'Mary W.', text: 'I had an implant placed at Maxx Dental Clinic — excellent care and supportive staff.' },
        { name: 'Samuel T.', text: 'My smile looks amazing after cosmetic work. Highly professional and painless.' },
    ];

    const services: Service[] = [
        {
            title: 'Teeth Cleaning',
            desc: 'Professional scaling & polishing. Duration: 30–60 min. Cost range: KES 1,500–4,000.',
            icon: <FaTeeth className="text-blue-600 text-3xl" /> },
        {
            title: 'Braces',
            desc: 'Traditional braces and clear options. Treatment length: 12–24 months.',
            icon: <FaSmile className="text-blue-600 text-3xl" /> },
        {
            title: 'Implants',
            desc: 'Long-lasting tooth replacement using high-quality implants.',
            icon: <FaTooth className="text-blue-600 text-3xl" /> },
        {
            title: 'Cosmetic Dentistry',
            desc: 'Veneers, whitening, bonding and smile makeovers.',
            icon: <FaSmile className="text-blue-600 text-3xl" />
        },
    ];

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading('Sending message...');

        // Collect form data
        const formData = new FormData(e.currentTarget);
        const payload = {
            name: formData.get('fullName'),
            clientEmailAddress: formData.get('email'),
            phoneNumber: phone.replace(/^\+/, ''), // removes leading '+'
            message: formData.get('message'),
        };

        const baseUrl = getBaseUrl();

        try {
            // Call your Spring Boot backend
            const res = await fetch(`${baseUrl}/api/v1/mail/contact-us/send`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (data?.responseHeader?.responseCode === 200) {
                toast.success(data.responseHeader.customerMessage || 'Message sent successfully!', { id: toastId });
                formRef.current?.reset();
                setPhone('');
            } else {
                toast.error(data?.responseHeader?.customerMessage || 'Failed to send message. Try again.', { id: toastId });
            }
        } catch (err) {
            console.error('Unable to send message:', err);
            toast.error('Failed to send message. Try again.', { id: toastId });
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            {/* Header */}
            <header
                className={`bg-white/50 backdrop-blur-xl shadow sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-1.5' : 'py-4'}`}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    {/* Logo + Clinic section */}
                    <div className="flex items-center gap-3 sm:gap-2">
                        <div className={`bg-blue-600 rounded flex items-center justify-center text-white font-bold transition-all duration-300 ${isScrolled ? 'w-6 h-6 text-sm' : 'w-12 h-12 text-base'}`}>
                            MD
                        </div>
                        <div className={`transition-all duration-300 ${isScrolled ? 'text-[0.75rem]' : 'text-lg'}`}>
                            <h1 className={`font-semibold transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-lg'}`}>Maxx Dental Clinic</h1>
                            <p className={`text-gray-500 transition-all duration-300 ${isScrolled ? 'text-xs' : 'text-sm'}`}>Bright Smiles, Gentle Care, Trusted Expertise</p>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-4 sm:gap-3 text-sm font-bold sm:text-xs">
                        {['services', 'about', 'team', 'gallery', 'contact'].map((section) => (
                            <a key={section} href={`#${section}`} className="hover:text-blue-600 transition-colors">
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </a>
                        ))}
                    </nav>

                    {/* Contact info */}
                    <div className="hidden md:flex flex-col text-sm text-right">
                        <div className="flex items-center gap-1 justify-end"><FaPhone className="text-blue-600" /> (+254) 797 579 972</div>
                        <div className="flex items-center gap-1 text-gray-500 text-xs justify-end"><FaMapMarkerAlt /> Thika Town • Next to KCB Bank</div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-2xl"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    id="mobile-menu"
                    className="md:hidden bg-white shadow-md overflow-hidden"
                    initial={{ opacity: 0, height: 0 }}
                    animate={mobileMenuOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <nav className="flex flex-col gap-2 p-4 text-sm">
                        {['services', 'about', 'team', 'gallery', 'contact'].map((section) => (
                            <a key={section} href={`#${section}`} className="hover:text-blue-600 transition-colors">
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </a>
                        ))}
                    </nav>
                </motion.div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8 sm:space-y-10">
                {/* Hero */}
                <motion.section
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-4 items-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div>
                        <h2 className="text-3xl sm:text-2xl font-extrabold mb-3">Welcome to Maxx Dental Clinic</h2>
                        <p className="text-base sm:text-sm text-gray-700 mb-4">
                            Compassionate, modern dental care in Thika Town. Expert clinicians, gentle treatment, and advanced technology.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                            <a
                                href="#contact"
                                className="px-4 py-2 sm:px-3 sm:py-2 bg-blue-600 text-white rounded shadow flex items-center gap-2 justify-center hover:bg-blue-700 transition-all text-sm sm:text-xs"
                            >
                                <FaEnvelope /> Book an Appointment
                            </a>
                            <a
                                href="tel:+254797579972"
                                className="px-4 py-2 sm:px-3 sm:py-2 border border-blue-600 rounded flex items-center gap-2 justify-center text-blue-600 hover:bg-blue-50 transition-all text-sm sm:text-xs"
                            >
                                <FaPhone /> Call Us
                            </a>
                        </div>
                    </div>
                    <div className="w-full h-60 sm:h-48 md:h-72 relative rounded overflow-hidden border-1">
                        <Image src="/hero.png" alt="Hero Image" fill className="object-cover" placeholder="blur" blurDataURL="/hero.png" />
                    </div>
                </motion.section>

                {/* Services */}
                <motion.section id="services" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <h3 className="text-2xl font-bold mb-4">Our Services</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {services.map((s) => (
                            <motion.div key={s.title} className="bg-white p-4 sm:p-5 rounded shadow-sm flex flex-col items-center text-center gap-2 sm:gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                {s.icon}
                                <h4 className="font-semibold">{s.title}</h4>
                                <p className="text-sm sm:text-xs text-gray-600">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* About */}
                <motion.section id="about" className="bg-white p-4 sm:p-6 rounded shadow-sm" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <h3 className="text-2xl font-bold mb-4">About Maxx Dental Clinic</h3>
                    <p className="text-gray-700 mb-4 text-sm sm:text-xs">
                        Founded with the goal of providing accessible, high-quality dental care to the Thika community, Maxx Dental Clinic blends modern dentistry with a friendly patient-centred approach. Our mission is to improve oral health outcomes while making each visit comfortable and educational.
                    </p>
                    <h4 className="font-semibold mt-4 text-sm sm:text-xs">Special Equipment & Technology</h4>
                    <ul className="list-disc list-inside text-gray-600 text-sm sm:text-xs">
                        <li>Digital X-ray and OPG imaging</li>
                        <li>Intraoral camera for clear diagnostics</li>
                        <li>CBCT for implant planning</li>
                        <li>High-speed suction & modern sterilization autoclaves</li>
                    </ul>
                </motion.section>

                {/* Team */}
                <motion.section id="team" className="grid gap-4 sm:gap-6" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <h3 className="text-2xl font-bold mb-4">Meet the Team</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {team.map((m) => (
                            <motion.div key={m.name} className="bg-white p-4 sm:p-5 rounded shadow-sm text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-200 mx-auto mb-2 sm:mb-3 overflow-hidden relative">
                                    <Image src={m.img} alt={m.name} fill className="object-cover hover:scale-105 transition-transform duration-300" placeholder="blur" blurDataURL="/avatar.png" />
                                </div>
                                <h4 className="font-semibold text-sm sm:text-base">{m.name}</h4>
                                <div className="text-sm sm:text-xs text-blue-600 mb-1 sm:mb-2">{m.role}</div>
                                <p className="text-sm sm:text-xs text-gray-600">{m.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Gallery */}
                <motion.section id="gallery" className="bg-white p-4 sm:p-6 rounded shadow-sm" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <h3 className="text-2xl font-bold mb-4">Before & After</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-28 sm:h-36 rounded overflow-hidden relative bg-gray-200 flex items-center justify-center text-gray-500">
                                <Image src={`/before-and-after-${i}.jpg`} alt={`Gallery ${i}`} fill className="object-cover hover:scale-105 transition-transform duration-300" placeholder="blur" blurDataURL="/before-and-after-1.jpg" />
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Testimonials */}
                <motion.section className="grid grid-cols-1 md:grid-cols-2 gap-4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <h3 className="text-2xl font-bold mb-4 col-span-full">Patient Testimonials</h3>
                    {testimonials.map((t, i) => (
                        <motion.div key={i} className="bg-white p-4 sm:p-5 rounded shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <p className="italic text-sm sm:text-xs">&quot;{t.text}&quot;</p>
                            <div className="text-sm sm:text-xs text-gray-700 mt-2">— {t.name}</div>
                        </motion.div>
                    ))}
                </motion.section>

                {/* Contact */}
                <motion.section id="contact" className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <div className="bg-white p-4 sm:p-6 rounded shadow-sm hover:shadow-lg transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-3">Contact & Appointments</h3>
                        <ul className="text-sm sm:text-xs text-gray-600 mb-3 space-y-2">
                            <li className="flex items-center gap-2"><FaPhone className="text-blue-600" /> (+254) 797 579 972</li>
                            <li className="flex items-center gap-2"><FaEnvelope className="text-blue-600" /> oduorfrancis134@gmail.com</li>
                            <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-blue-600" /> Thika Town • Next to KCB Bank</li>
                        </ul>
                        <iframe
                            className="w-full h-48 sm:h-56 rounded"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.326423042366!2d37.069438615346!3d-1.040323936309983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1818c09a12ef%3A0xecd0f0a9f5f2d8eb!2sThika%2C%20Kenya!5e0!3m2!1sen!2ske!4v1707464090000!5m2!1sen!2ske"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="bg-white p-4 sm:p-6 rounded shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-full">
                        <h4 className="font-semibold mb-3 text-lg sm:text-base">Send us a message</h4>
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
                            <div>
                                <label className="flex items-center gap-2 font-medium text-gray-700 mb-1 text-sm sm:text-xs"><FaUser className="text-blue-600" /> Full Name</label>
                                <input required type="text" name="fullName" className="w-full p-2 sm:p-1 text-sm sm:text-xs border rounded focus:ring-2 focus:ring-blue-600 focus:outline-none transition" />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 font-medium text-gray-700 mb-1 text-sm sm:text-xs"><FaEnvelope className="text-blue-600" /> Email Address</label>
                                <input required type="email" name="email" className="w-full p-2 sm:p-1 text-sm sm:text-xs border rounded focus:ring-2 focus:ring-blue-600 focus:outline-none transition" />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 font-medium text-gray-700 mb-1 text-sm sm:text-xs"><FaPhone className="text-blue-600" /> Phone Number</label>
                                <p className="text-xs sm:text-[10px] text-gray-500 mb-1">Include country code (e.g. +254 7XXXXXXXX)</p>
                                <PhoneInput
                                    defaultCountry="ke"
                                    value={phone}
                                    onChange={setPhone}
                                    inputProps={{ name: 'phone', required: true }}
                                    className="w-full sm:w-full"
                                    inputClassName="w-full p-2 sm:p-1 text-sm sm:text-xs border rounded focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 font-medium text-gray-700 mb-1 text-sm sm:text-xs"><FaCommentDots className="text-blue-600" /> Message</label>
                                <textarea required name="message" className="w-full p-2 sm:p-1 text-sm sm:text-xs border rounded focus:ring-2 focus:ring-blue-600 focus:outline-none transition" rows={4} placeholder="Type your message here..." />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <button type="submit" disabled={loading} className="px-4 py-2 sm:px-3 sm:py-2 bg-blue-600 text-white rounded flex items-center gap-2 justify-center hover:bg-blue-700 transition-all text-sm sm:text-xs">
                                    <FaEnvelope /> {loading ? 'Sending...' : 'Send Message'}
                                </button>
                                <a href="mailto:oduorfrancis134@gmail.com" className="px-4 py-2 sm:px-3 sm:py-2 border rounded flex items-center gap-2 justify-center text-blue-600 hover:bg-blue-50 transition-all text-sm sm:text-xs">
                                    <FaEnvelope /> Email Us
                                </a>
                            </div>
                        </form>
                    </div>
                </motion.section>

                {/* FAQ */}
                <motion.section className="bg-white p-4 sm:p-6 rounded shadow-sm" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                    <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
                    {faqs.map((f, i) => (
                        <div key={i} className="mb-2 border-b border-gray-200 last:border-b-0">
                            <button
                                onClick={() => toggleFaq(i)}
                                className="w-full flex justify-between items-center py-2 text-left text-sm sm:text-xs font-medium text-gray-700 hover:text-blue-600 transition"
                            >
                                {f.q} <FaChevronDown className={`transition-transform duration-300 ${faqOpen[i] ? 'rotate-180' : ''}`} />
                            </button>
                            {faqOpen[i] && <p className="text-gray-600 text-sm sm:text-xs py-1">{f.a}</p>}
                        </div>
                    ))}
                </motion.section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-200 py-6">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>&copy; {new Date().getFullYear()} Maxx Dental Clinic. All rights reserved.</div>
                    <div className="flex gap-3 text-xl">
                        <a href="#" aria-label="Facebook" className="hover:text-blue-600 transition"><FaFacebook /></a>
                        <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition"><FaInstagram /></a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-blue-400 transition"><FaLinkedin /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

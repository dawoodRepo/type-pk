import { Mail, MessageSquare, Clock } from 'lucide-react'
import { useState } from 'react'
import SEO from '../components/SEO'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    // Will connect to backend or Formspree later
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen pt-28 pb-20">
      <SEO
        title="Contact Us"
        description="Get in touch with TypePK. Report bugs, suggest features, or ask questions about ETEA typing test preparation."
        canonical="/contact"
      />
      <div className="max-w-3xl mx-auto px-4 flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-500 dark:text-primary-400 text-sm font-medium w-fit">
            Contact Us
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text">
            Get in touch
          </h1>
          <p className="text-light-subtext dark:text-dark-subtext leading-relaxed">
            Found a bug? Have a suggestion? Want to report a passage error? We read every message.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Info Cards */}
          <div className="flex flex-col gap-4">
            {[
              {
                icon: <Mail size={18} />,
                title: 'Email',
                value: 'hello@typepk.com',
                sub: 'We reply within 24 hours'
              },
              {
                icon: <MessageSquare size={18} />,
                title: 'Feedback',
                value: 'All feedback welcome',
                sub: 'Bug reports, suggestions, improvements'
              },
              {
                icon: <Clock size={18} />,
                title: 'Response Time',
                value: 'Within 24 hours',
                sub: 'Monday to Saturday'
              },
            ].map(item => (
              <div
                key={item.title}
                className="p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface flex flex-col gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-500/10 text-primary-500 dark:text-primary-400 flex items-center justify-center">
                  {item.icon}
                </div>
                <p className="text-xs font-semibold text-light-subtext dark:text-dark-subtext uppercase tracking-wider">
                  {item.title}
                </p>
                <p className="text-sm font-medium text-light-text dark:text-dark-text">
                  {item.value}
                </p>
                <p className="text-xs text-light-subtext dark:text-dark-subtext">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="h-full rounded-2xl border border-green-500/30 bg-green-500/5 flex flex-col items-center justify-center gap-3 p-10 text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 text-2xl">
                  ✓
                </div>
                <h3 className="font-bold text-light-text dark:text-dark-text text-lg">
                  Message sent!
                </h3>
                <p className="text-sm text-light-subtext dark:text-dark-subtext">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }) }}
                  className="mt-2 text-sm text-primary-500 hover:text-primary-600 font-medium transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 flex flex-col gap-4">

                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-light-subtext dark:text-dark-subtext uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      autoComplete="name"
                      className="px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text text-sm outline-none focus:border-primary-500 transition-colors duration-200 placeholder:text-light-subtext/50 dark:placeholder:text-dark-subtext/50"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-light-subtext dark:text-dark-subtext uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      autoComplete="email"
                      className="px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text text-sm outline-none focus:border-primary-500 transition-colors duration-200 placeholder:text-light-subtext/50 dark:placeholder:text-dark-subtext/50"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-medium text-light-subtext dark:text-dark-subtext uppercase tracking-wider">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    autoComplete="off"
                    className="px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text text-sm outline-none focus:border-primary-500 transition-colors duration-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="bug">Bug Report</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="passage">Passage Error</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-light-subtext dark:text-dark-subtext uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    autoComplete="off"
                    className="px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text text-sm outline-none focus:border-primary-500 transition-colors duration-200 placeholder:text-light-subtext/50 dark:placeholder:text-dark-subtext/50 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email || !formData.message}
                  className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 hover:scale-[1.02]"
                >
                  Send Message
                </button>

              </div>
            )}
          </div>

        </div>

      </div>
    </main>
  )
}

export default Contact
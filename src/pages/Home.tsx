import { Link } from 'react-router-dom'
import { Keyboard, Target, Clock, BarChart3, ChevronRight } from 'lucide-react'
import SEO from '../components/SEO'

const features = [
  {
    icon: <Target size={22} />,
    title: 'ETEA Accurate',
    description: 'Mirrors the exact ETEA typing environment — same rules, same restrictions, same pressure.'
  },
  {
    icon: <Clock size={22} />,
    title: 'Timed Practice',
    description: 'Practice with 3, 5, or 10 minute timers matching real exam durations.'
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'Instant Results',
    description: 'Get your Gross WPM, Net WPM, accuracy and error count the moment time ends.'
  },
  {
    icon: <Keyboard size={22} />,
    title: 'Real Passages',
    description: 'Practice on formal Pakistani government-style paragraphs, not random word lists.'
  },
]

const stats = [
  { value: '30 WPM', label: 'Junior Clerk Minimum' },
  { value: '40 WPM', label: 'Computer Operator Minimum' },
  { value: '95%', label: 'Accuracy Required' },
  { value: '10 Min', label: 'Standard Test Duration' },
]

const Home = () => {
  return (
    <main className="min-h-screen bg-light-bg dark:bg-dark-bg pt-16">
      <SEO
        title="Free ETEA Typing Test Practice"
        description="Practice for your ETEA typing test online. Mirrors the real exam environment — same rules, same passages, same pressure. Free, no account needed."
        canonical="/"
      />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-20 flex flex-col items-center text-center gap-6">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-500 dark:text-primary-400 text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          Free ETEA Typing Practice
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-light-text dark:text-dark-text leading-tight max-w-3xl">
          Pass Your{' '}
          <span className="text-primary-500 dark:text-primary-400">
            ETEA Typing Test
          </span>{' '}
          On First Try
        </h1>

        {/* Subheading */}
        <p className="text-lg text-light-subtext dark:text-dark-subtext max-w-xl leading-relaxed">
          Practice in an environment that mirrors the real ETEA exam. Same interface, same rules, same pressure — so exam day feels familiar.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
          <Link
            to="/practice"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all duration-200 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-105"
          >
            Start Practicing
            <ChevronRight size={18} />
          </Link>
          <Link
            to="/about"
            className="px-6 py-3 rounded-xl border border-light-border dark:border-dark-border text-light-text dark:text-dark-text font-medium hover:border-primary-500 transition-all duration-200"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <span className="text-2xl font-bold text-primary-500 dark:text-primary-400">
                {stat.value}
              </span>
              <span className="text-sm text-light-subtext dark:text-dark-subtext">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-3">
            Built for the Real Exam
          </h2>
          <p className="text-light-subtext dark:text-dark-subtext max-w-lg mx-auto">
            Unlike generic typing sites, every feature here is designed around how ETEA actually works.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:border-primary-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/5"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 dark:text-primary-400 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-light-subtext dark:text-dark-subtext leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-2xl bg-primary-600 dark:bg-primary-700 p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">
              Ready to hit 30 WPM?
            </h2>
            <p className="text-primary-100 text-sm">
              Start practicing now — it's free, no account needed.
            </p>
          </div>
          <Link
            to="/practice"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-600 font-semibold hover:bg-primary-50 transition-all duration-200 whitespace-nowrap hover:scale-105"
          >
            Start Test Now
            <ChevronRight size={18} />
          </Link>
        </div>
      </section>

    </main>
  )
}

export default Home

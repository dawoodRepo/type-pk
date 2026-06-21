import { Link } from 'react-router-dom'
import { Target, Shield, Zap, Heart, ChevronRight } from 'lucide-react'
import SEO from '../components/SEO'

const values = [
  {
    icon: <Target size={20} />,
    title: 'Exam Accurate',
    description: 'Every rule, restriction, and behavior mirrors the real ETEA software. No surprises on exam day.'
  },
  {
    icon: <Shield size={20} />,
    title: 'No Account Needed',
    description: 'Just open the site and practice. No signups, no emails, no tracking.'
  },
  {
    icon: <Zap size={20} />,
    title: 'Always Free',
    description: 'Built for Pakistani job seekers. This tool will always be free to use.'
  },
  {
    icon: <Heart size={20} />,
    title: 'Built with Care',
    description: 'Made by someone who understands the pressure of government job exams in Pakistan.'
  },
]

const About = () => {
  return (
    <main className="min-h-screen pt-28 pb-20">
      <SEO
        title="About TypePK"
        description="TypePK is a free ETEA typing test practice platform built for Pakistani government job seekers. No account needed, always free."
        canonical="/about"
      />
      <div className="max-w-3xl mx-auto px-4 flex flex-col gap-16">

        {/* Hero */}
        <div className="flex flex-col gap-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-500 dark:text-primary-400 text-sm font-medium w-fit">
            About TypePK
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text leading-tight">
            Built for one reason —{' '}
            <span className="text-primary-500 dark:text-primary-400">
              help you pass
            </span>
          </h1>
          <p className="text-light-subtext dark:text-dark-subtext leading-relaxed text-lg">
            TypePK was built because most typing practice sites are made for general audiences. They use random word lists, allow infinite backspace, show live WPM graphs, and feel nothing like what you actually face in an ETEA exam hall.
          </p>
          <p className="text-light-subtext dark:text-dark-subtext leading-relaxed">
            We built the opposite. A strict, focused environment that matches the real exam — same passage style, same backspace rules, same word locking, same pressure. So when you sit down on exam day, it already feels familiar.
          </p>
        </div>

        {/* What is ETEA typing test */}
        <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-8 flex flex-col gap-5">
          <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
            What is the ETEA Typing Test?
          </h2>
          <p className="text-light-subtext dark:text-dark-subtext leading-relaxed">
            ETEA (Educational Testing and Evaluation Agency) conducts recruitment tests for government jobs in Khyber Pakhtunkhwa. For clerical positions like Junior Clerk, Senior Clerk, and Computer Operator, a typing test is a mandatory part of the selection process.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Junior Clerk', req: '30 WPM • 95% accuracy' },
              { label: 'Senior Clerk', req: '35 WPM • 95% accuracy' },
              { label: 'Computer Operator', req: '40 WPM • 95% accuracy' },
            ].map(item => (
              <div key={item.label} className="rounded-xl border border-light-border dark:border-dark-border p-4">
                <p className="font-semibold text-sm text-light-text dark:text-dark-text mb-1">{item.label}</p>
                <p className="text-xs text-primary-500 dark:text-primary-400">{item.req}</p>
              </div>
            ))}
          </div>
          <p className="text-light-subtext dark:text-dark-subtext leading-relaxed text-sm">
            The test is conducted at ETEA designated computer labs. You are given a formal paragraph to copy-type within a fixed time limit. Mistakes are penalized, and both speed and accuracy must independently meet the cutoff — they are not averaged together.
          </p>
        </div>

        {/* Values */}
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
            What we stand for
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {values.map(value => (
              <div
                key={value.title}
                className="group p-6 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-lg bg-primary-500/10 text-primary-500 dark:text-primary-400 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="font-semibold text-light-text dark:text-dark-text mb-2 text-sm">
                  {value.title}
                </h3>
                <p className="text-sm text-light-subtext dark:text-dark-subtext leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-primary-600 dark:bg-primary-700 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-white mb-1">
              Ready to start practicing?
            </h2>
            <p className="text-primary-100 text-sm">
              Free, no account needed, no time limit on practice.
            </p>
          </div>
          <Link
            to="/practice"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-600 font-semibold hover:bg-primary-50 transition-all duration-200 whitespace-nowrap hover:scale-105"
          >
            Start Practicing
            <ChevronRight size={18} />
          </Link>
        </div>

      </div>
    </main>
  )
}

export default About
import { Clock, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const posts = [
  {
    slug: 'how-etea-calculates-wpm',
    title: 'How ETEA Calculates Your WPM Score',
    excerpt: 'Most people think WPM is just how fast you type. In ETEA exams, it works differently. Here is the exact formula and how errors affect your final score.',
    category: 'Exam Guide',
    readTime: '4 min read',
    date: 'June 2026',
  },
  {
    slug: 'etea-typing-test-rules',
    title: 'ETEA Typing Test Rules You Must Know Before Exam Day',
    excerpt: 'Backspace restrictions, word locking, case sensitivity, the ETEA typing environment has rules that most candidates discover too late. Know them before you sit down.',
    category: 'Exam Guide',
    readTime: '5 min read',
    date: 'June 2026',
  },
  {
    slug: 'how-to-improve-typing-speed',
    title: 'How to Improve Typing Speed for Pakistani Government Exams',
    excerpt: 'Generic typing advice does not work for ETEA. Here is a focused practice strategy built around the actual exam format, passage style, and scoring system.',
    category: 'Tips',
    readTime: '6 min read',
    date: 'June 2026',
  },
  {
    slug: 'junior-clerk-typing-test-guide',
    title: 'Junior Clerk Typing Test, Complete Preparation Guide',
    excerpt: 'Everything you need to know about the Junior Clerk typing requirement: minimum WPM, accuracy threshold, exam format, and how to practice effectively.',
    category: 'Job Guide',
    readTime: '7 min read',
    date: 'June 2026',
  },
  {
    slug: 'etea-vs-monkeytype',
    title: 'Why Your Monkeytype Score Does Not Reflect Your ETEA Score',
    excerpt: 'Scoring 60 WPM on Monkeytype but struggling in the actual exam? Here is why the two environments are completely different and how to bridge the gap.',
    category: 'Tips',
    readTime: '4 min read',
    date: 'June 2026',
  },
  {
    slug: 'computer-operator-typing-requirements',
    title: 'Computer Operator Typing Test, What 40 WPM Actually Feels Like',
    excerpt: 'The Computer Operator post requires 40 WPM with 95% accuracy. Here is what that looks like in practice and a realistic timeline to get there.',
    category: 'Job Guide',
    readTime: '5 min read',
    date: 'June 2026',
  },
]

const categoryColors: Record<string, string> = {
  'Exam Guide': 'bg-blue-500/10 text-blue-500 dark:text-blue-400',
  'Tips': 'bg-green-500/10 text-green-500 dark:text-green-400',
  'Job Guide': 'bg-purple-500/10 text-purple-500 dark:text-purple-400',
}

const Blog = () => {
  return (
    <main className="min-h-screen pt-28 pb-20">
      <SEO
        title="ETEA Typing Test Guides & Tips"
        description="Guides, tips, and exam strategies for ETEA, PPSC, and NTS typing tests. Learn how WPM is calculated, exam rules, and how to prepare effectively."
        canonical="/blog"
      />
      <div className="max-w-4xl mx-auto px-4 flex flex-col gap-12">

        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-500 dark:text-primary-400 text-sm font-medium w-fit">
            Blog
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text">
            Guides & Tips
          </h1>
          <p className="text-light-subtext dark:text-dark-subtext leading-relaxed max-w-xl">
            Everything you need to know about ETEA typing tests, scoring, preparation strategy, and government job requirements in Pakistan.
          </p>
        </div>

        {/* Featured Post */}
        <Link to={`/blog/${posts[0].slug}`} className="rounded-2xl border border-primary-500/30 bg-primary-500/5 dark:bg-primary-500/10 p-8 flex flex-col gap-4 group hover:border-primary-500/60 transition-all duration-300">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${categoryColors[posts[0].category]}`}>
              {posts[0].category}
            </span>
            <span className="text-xs text-light-subtext dark:text-dark-subtext flex items-center gap-1">
              <Clock size={12} />
              {posts[0].readTime}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-light-text dark:text-dark-text group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200">
            {posts[0].title}
          </h2>
          <p className="text-light-subtext dark:text-dark-subtext leading-relaxed">
            {posts[0].excerpt}
          </p>
          <div className="flex items-center gap-2 text-primary-500 dark:text-primary-400 text-sm font-medium">
            Read article
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </Link>

        {/* Rest of Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.slice(1).map(post => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 flex flex-col gap-3 hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
                <span className="text-xs text-light-subtext dark:text-dark-subtext flex items-center gap-1">
                  <Clock size={12} />
                  {post.readTime}
                </span>
              </div>
              <h2 className="font-bold text-light-text dark:text-dark-text group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-light-subtext dark:text-dark-subtext leading-relaxed flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-primary-500 dark:text-primary-400 text-sm font-medium mt-1">
                Read article
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Note */}
        <div className="rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-5 text-center">
          <p className="text-sm text-light-subtext dark:text-dark-subtext">
            More articles coming soon. Have a topic you want covered?{' '}
            <Link to="/contact" className="text-primary-500 hover:text-primary-600 font-medium transition-colors">
              Let us know
            </Link>
          </p>
        </div>

      </div>
    </main>
  )
}

export default Blog
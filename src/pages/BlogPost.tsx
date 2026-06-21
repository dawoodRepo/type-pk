import { useParams, Link, useNavigate } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import SEO from '../components/SEO'
import AdUnit from '../components/ads/AdUnit'
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react'

const categoryColors: Record<string, string> = {
  'Exam Guide': 'bg-blue-500/10 text-blue-500 dark:text-blue-400',
  'Tips': 'bg-green-500/10 text-green-500 dark:text-green-400',
  'Job Guide': 'bg-purple-500/10 text-purple-500 dark:text-purple-400',
}

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <main className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">Article not found</h1>
        <Link to="/blog" className="text-primary-500 hover:text-primary-600 font-medium transition-colors">
          Back to Blog
        </Link>
      </main>
    )
  }

  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <main className="min-h-screen pt-28 pb-20">
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        type="article"
        articleDate="2026-06-01"
      />
      <div className="max-w-3xl mx-auto px-4 flex flex-col gap-10">

        {/* Back */}
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-sm text-light-subtext dark:text-dark-subtext hover:text-primary-500 transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </button>

        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${categoryColors[post.category]}`}>
              {post.category}
            </span>
            <span className="text-xs text-light-subtext dark:text-dark-subtext flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
            <span className="text-xs text-light-subtext dark:text-dark-subtext">
              {post.date}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text leading-tight">
            {post.title}
          </h1>
          <p className="text-light-subtext dark:text-dark-subtext leading-relaxed text-lg">
            {post.excerpt}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-light-border dark:bg-dark-border" />

        {/* Content */}
        <div className="flex flex-col gap-8">
          {post.sections.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h2 className="text-xl font-bold text-light-text dark:text-dark-text">
                {section.heading}
              </h2>
              <p className="text-light-subtext dark:text-dark-subtext leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
              {idx === 1 && <AdUnit slot="blog-inline" className="my-2" />}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-light-border dark:bg-dark-border" />

        {/* CTA */}
        <div className="rounded-2xl bg-primary-600 dark:bg-primary-700 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-white mb-1">
              Ready to practice?
            </h2>
            <p className="text-primary-100 text-sm">
              Put what you just learned into action.
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

        {/* More Articles */}
        <div className="flex flex-col gap-5">
          <h3 className="font-bold text-light-text dark:text-dark-text">
            More Articles
          </h3>
          <div className="flex flex-col gap-3">
            {otherPosts.map(other => (
              <Link
                key={other.slug}
                to={`/blog/${other.slug}`}
                aria-label={`Read article: ${other.title}`}
                className="group flex items-center justify-between p-4 rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:border-primary-500/50 transition-all duration-200"
              >
                <div className="flex flex-col gap-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-md w-fit ${categoryColors[other.category]}`}>
                    {other.category}
                  </span>
                  <span className="text-sm font-medium text-light-text dark:text-dark-text group-hover:text-primary-500 transition-colors">
                    {other.title}
                  </span>
                </div>
                <ChevronRight size={16} aria-hidden="true" className="text-light-subtext dark:text-dark-subtext group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200 shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}

export default BlogPost

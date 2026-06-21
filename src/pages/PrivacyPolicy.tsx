import SEO from '../components/SEO'

const sections = [
  {
    title: 'Information We Collect',
    content: `TypePK does not require you to create an account or provide any personal information to use the typing practice tool. We do not collect your name, email address, or any identifying information during normal use of the site.

We may collect basic anonymous usage data through analytics tools (such as Google Analytics) including pages visited, time spent on the site, and general geographic location (country/city level). This data is aggregated and cannot be used to identify you personally.`
  },
  {
    title: 'Cookies',
    content: `We use a single cookie to remember your theme preference (dark or light mode). This cookie is stored locally on your device and contains no personal information.

If we display advertisements through Google AdSense or similar networks, those services may use their own cookies to show relevant ads. We do not control these cookies. You can opt out of personalized advertising through Google's Ad Settings.`
  },
  {
    title: 'Advertising',
    content: `TypePK displays advertisements to support free access to the platform. We use third-party advertising networks including Google AdSense. These networks may use cookies and web beacons to serve ads based on your prior visits to this and other websites.

We do not share any personal data with advertisers. The ads you see are served automatically based on the content of the page and general browsing behavior tracked by the ad network, not by us.`
  },
  {
    title: 'How We Use Information',
    content: `Any anonymous data we collect is used solely to understand how the site is being used and to improve the experience. We use this data to identify which features are most useful, fix bugs, and improve content.

We do not sell, rent, trade, or share any data with third parties for marketing purposes.`
  },
  {
    title: 'Third Party Services',
    content: `TypePK may use the following third-party services, each with their own privacy policies:

- Google Analytics — for understanding site traffic and usage patterns
- Google AdSense — for displaying advertisements
- Cloudflare — for hosting and content delivery

We encourage you to review the privacy policies of these services if you have concerns about how they handle data.`
  },
  {
    title: 'Children\'s Privacy',
    content: `TypePK is intended for general audiences including students preparing for government exams. We do not knowingly collect personal information from children under the age of 13. If you believe a child has provided us with personal information, please contact us and we will delete it immediately.`
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date at the top. We encourage you to review this page periodically. Continued use of the site after changes are posted constitutes your acceptance of the updated policy.`
  },
  {
    title: 'Contact',
    content: `If you have any questions about this Privacy Policy or how your data is handled, please contact us at hello@typepk.com. We will respond within 24 hours.`
  },
]

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen pt-28 pb-20">
      <SEO
        title="Privacy Policy"
        description="TypePK privacy policy. We collect almost no data. Read how we handle the little information we do collect."
        canonical="/privacy-policy"
      />
      <div className="max-w-3xl mx-auto px-4 flex flex-col gap-10">

        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-500 dark:text-primary-400 text-sm font-medium w-fit">
            Legal
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text">
            Privacy Policy
          </h1>
          <p className="text-light-subtext dark:text-dark-subtext text-sm">
            Last updated: June 2026
          </p>
          <p className="text-light-subtext dark:text-dark-subtext leading-relaxed">
            TypePK is committed to protecting your privacy. This policy explains what information we collect, how we use it, and what rights you have. The short version: we collect almost nothing, and what little we do collect is never sold or shared.
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-6">
          {sections.map((section, idx) => (
            <div
              key={section.title}
              className="rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-primary-500 dark:text-primary-400 bg-primary-500/10 rounded-lg px-2.5 py-1">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h2 className="font-bold text-light-text dark:text-dark-text">
                  {section.title}
                </h2>
              </div>
              <div className="text-sm text-light-subtext dark:text-dark-subtext leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}

export default PrivacyPolicy
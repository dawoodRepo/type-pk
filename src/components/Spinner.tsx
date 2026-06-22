const Spinner = ({ inline = false }: { inline?: boolean }) => (
  inline
    ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
    : (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
      </div>
    )
)

export default Spinner

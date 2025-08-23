export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Simple Test Page</h1>
        <p className="text-slate-600">This is a minimal test page with no complex components.</p>
        <button 
          onClick={() => alert('Button clicked!')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Button
        </button>
      </div>
    </div>
  )
}
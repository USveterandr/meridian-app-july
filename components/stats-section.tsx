import { TrendingUp, Users, Award, MapPin } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: TrendingUp,
      value: "$2.5B+",
      label: "Total Sales Volume",
      description: "In luxury real estate transactions",
    },
    {
      icon: Users,
      value: "10K+",
      label: "Happy Clients",
      description: "Satisfied homeowners worldwide",
    },
    {
      icon: Award,
      value: "25+",
      label: "Years Experience",
      description: "In premium real estate",
    },
    {
      icon: MapPin,
      value: "50+",
      label: "Prime Locations",
      description: "Across major cities",
    },
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Trusted by Thousands</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Our track record speaks for itself. We&apos;ve helped thousands find their perfect luxury home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group-hover:-translate-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl mb-6">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-slate-700 mb-2">{stat.label}</div>
                <div className="text-slate-600">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

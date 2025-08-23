"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Heart } from "lucide-react"
import Image from "next/image"

export function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      title: "Modern Luxury Villa",
      location: "Beverly Hills, CA",
      price: "$4,250,000",
      image: "/placeholder.svg?height=300&width=400",
      beds: 5,
      baths: 4,
      sqft: "4,200",
      featured: true,
    },
    {
      id: 2,
      title: "Penthouse Suite",
      location: "Manhattan, NY",
      price: "$8,900,000",
      image: "/placeholder.svg?height=300&width=400",
      beds: 3,
      baths: 3,
      sqft: "2,800",
      featured: true,
    },
    {
      id: 3,
      title: "Oceanfront Estate",
      location: "Malibu, CA",
      price: "$12,500,000",
      image: "/placeholder.svg?height=300&width=400",
      beds: 6,
      baths: 7,
      sqft: "8,500",
      featured: false,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Properties</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover our handpicked selection of the most exclusive properties available today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  {property.featured && <Badge className="bg-amber-600 hover:bg-amber-700 text-white">Featured</Badge>}
                </div>
                <button 
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-colors"
                  aria-label={`Add ${property.title} to favorites`}
                >
                  <Heart className="h-5 w-5 text-slate-600 hover:text-red-500" />
                </button>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center text-slate-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                  {property.title}
                </h3>

                <div className="text-2xl font-bold text-amber-600 mb-4">{property.price}</div>

                <div className="flex items-center justify-between text-slate-600 mb-6">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.beds} beds</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.baths} baths</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.sqft} sqft</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
          >
            View All Properties
          </Button>
        </div>
      </div>
    </section>
  )
}

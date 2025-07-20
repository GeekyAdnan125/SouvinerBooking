"use client"
import { MapPin, Star, ShoppingCart } from "lucide-react"

export default function SouvenirCard({ souvenir, onClick }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={souvenir.thumbnail}
          alt={souvenir.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
          ${souvenir.price}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          {souvenir.region}
        </div>

        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
          {souvenir.name}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2">
          {souvenir.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span className="text-sm font-medium text-gray-800">{souvenir.rating}</span>
            <span className="text-sm text-gray-500">({souvenir.reviews})</span>
          </div>

          <div className={`flex items-center gap-1 text-sm font-medium ${souvenir.inStock ? 'text-green-600' : 'text-red-500'}`}>
            <ShoppingCart className="w-4 h-4" />
            {souvenir.inStock ? "In Stock" : "Out of Stock"}
          </div>
        </div>
      </div>
    </div>
  )
}

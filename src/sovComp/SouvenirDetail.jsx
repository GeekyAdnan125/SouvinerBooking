"use client"

import { useState } from "react"
import {
  ArrowLeft,
  MapPin,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react"

export default function SouvenirDetail({ souvenir, onBack, onBookNow }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="container mx-auto px-6 md:px-12 py-12 mt-20">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Souvenirs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-sm">
            <img
              src={souvenir.images?.[selectedImage] || souvenir.image}
              alt={souvenir.name}
              className="w-full h-full object-cover"
            />
          </div>

          {souvenir.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto">
              {souvenir.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              {souvenir.region} • {souvenir.category}
            </div>

            <h1 className="text-3xl font-bold text-slate-800 mb-3">{souvenir.name}</h1>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-5 h-5 fill-yellow-400" />
                <span className="font-medium text-slate-700">{souvenir.rating}</span>
                <span className="text-sm text-slate-500">({souvenir.reviews} reviews)</span>
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                  <Heart className="w-5 h-5 text-slate-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                  <Share2 className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="text-3xl font-bold text-blue-600">${souvenir.price}</div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2 text-slate-700">Description</h3>
            <p className="text-slate-600 leading-relaxed">{souvenir.description}</p>
          </div>

          {/* Features */}
          {souvenir.features?.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2 text-slate-700">Features</h3>
              <ul className="space-y-2">
                {souvenir.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-slate-600">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity and Book Now */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => onBookNow({ ...souvenir, quantity })}
              disabled={!souvenir.inStock}
              className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                souvenir.inStock
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {souvenir.inStock ? "Book Now" : "Out of Stock"}
            </button>
          </div>

          {/* Shipping & Returns */}
          <div className="border-t pt-6 space-y-4 text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-blue-500" />
              Free shipping on orders over $50
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-500" />
              Authentic guarantee
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-blue-500" />
              30-day return policy
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

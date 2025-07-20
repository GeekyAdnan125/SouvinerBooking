"use client"

import { useState, useEffect } from "react"
import SouvenirListing from "../sovComp/SouvenirListing"
import SouvenirDetail from "../sovComp/SouvenirDetail"
import BookingForm from "../sovComp/BookingForm"
import { LoadingSpinner } from "../sovComp/ui/loading-spinner"
import { Alert } from "../sovComp/ui/alert"

export default function SouBooking_App() {
  const [currentView, setCurrentView] = useState("listing")
  const [selectedSouvenir, setSelectedSouvenir] = useState(null)
  const [bookingData, setBookingData] = useState(null)
  const [souvenirs, setSouvenirs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showTopBtn, setShowTopBtn] = useState(false)

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentView])

  // Show "back to top" button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const fetchSouvenirs = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch("https://voyagerserver.onrender.com/api/souvenirs/getallsouviners")
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`HTTP error! status: ${response.status}, ${errorText}`)
        }

        const result = await response.json()
        let data = []

        if (Array.isArray(result)) {
          data = result
        } else if (result && Array.isArray(result.data)) {
          data = result.data
        } else {
          throw new Error("Invalid data format received from API")
        }

        const transformedData = data.map((item, index) => ({
          id: item._id || item.id || `temp-${index}`,
          name: item.name || item.title || "Unnamed Souvenir",
          price: Number(item.price) || 0,
          image: item.image || item.imageUrl || "/placeholder.jpg",
          thumbnail: item.thumbnail,
          region: item.region || 'Unknown',
          category: item.category || 'General',
          description: item.description || 'No description available',
          rating: Number(item.rating) || 0,
          reviews: Number(item.reviews) || 0,
          inStock: item.inStock !== undefined ? Boolean(item.inStock) : true,
          features: Array.isArray(item.features) ? item.features : [],
          images: Array.isArray(item.images) ? item.images : [item.image || "/placeholder.jpg"]
        }))

        setSouvenirs(transformedData)
      } catch (err) {
        console.error("Fetch error:", err)
        setError(err.message || "Failed to load souvenirs. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSouvenirs()
  }, [])

  const handleSouvenirClick = (souvenir) => {
    setSelectedSouvenir(souvenir)
    setCurrentView("detail")
  }

  const handleBookNow = (souvenir) => {
    setBookingData(souvenir)
    setCurrentView("booking")
  }

  const handleBackToListing = () => {
    setCurrentView("listing")
    setSelectedSouvenir(null)
    setBookingData(null)
  }

  const handleBookingComplete = () => {
    alert("Booking confirmed! You will receive a confirmation email shortly.")
    handleBackToListing()
  }

  // ---------------------- Loading State ----------------------
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center">
        <div className="flex items-center space-x-4">
          <LoadingSpinner size="lg" />
          <span className="text-gray-700 text-lg font-medium animate-pulse">Loading souvenirs...</span>
        </div>
      </div>
    )
  }

  // ---------------------- Error State ----------------------
  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-300 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <Alert type="error" title="API Error" className="mb-4 text-sm">
            {error}
          </Alert>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full bg-red-600 text-white py-2 rounded-xl shadow hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // ---------------------- No Data ----------------------
  if (souvenirs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg border w-full max-w-lg text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No Souvenirs Found</h2>
          <Alert type="info" className="mb-4 text-sm">
            Our catalog is currently empty. Please check back soon.
          </Alert>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>
    )
  }

  // ---------------------- Main UI ----------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4 transition-all duration-500 ease-in-out">
      <div className="max-w-7xl mx-auto">
        {currentView === "listing" && (
          <div className="animate-fadeIn">
            <SouvenirListing souvenirs={souvenirs} onSouvenirClick={handleSouvenirClick} />
          </div>
        )}

        {currentView === "detail" && selectedSouvenir && (
          <div className="animate-slideInRight">
            <SouvenirDetail
              souvenir={selectedSouvenir}
              onBack={handleBackToListing}
              onBookNow={handleBookNow}
            />
          </div>
        )}

        {currentView === "booking" && bookingData && (
          <div className="animate-slideInUp">
            <BookingForm
              souvenir={bookingData}
              onBack={() => setCurrentView("detail")}
              onBookingComplete={handleBookingComplete}
            />
          </div>
        )}
      </div>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-xl transition-all duration-300 z-50"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          ⬆️
        </button>
      )}
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"

export function ContactMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // For demo purposes, we'll use a placeholder map
    // In a real application, you would use your Google Maps API key
    const initMap = () => {
      if (!mapRef.current) return

      // Create a simple placeholder map
      const canvas = document.createElement("canvas")
      canvas.width = mapRef.current.clientWidth
      canvas.height = mapRef.current.clientHeight
      canvas.style.width = "100%"
      canvas.style.height = "100%"

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Draw a placeholder map
      ctx.fillStyle = "#e5e7eb"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = "#d1d5db"
      ctx.lineWidth = 1

      // Horizontal lines
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Vertical lines
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      // Draw a marker
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Pin base
      ctx.fillStyle = "#8b5cf6"
      ctx.beginPath()
      ctx.arc(centerX, centerY, 10, 0, Math.PI * 2)
      ctx.fill()

      // Pin dot
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2)
      ctx.fill()

      // Add text
      ctx.fillStyle = "#4b5563"
      ctx.font = "14px Arial"
      ctx.textAlign = "center"
      ctx.fillText("NexLearn Headquarters", centerX, centerY - 20)

      // Clear any existing content and append the canvas
      if (mapRef.current) {
        mapRef.current.innerHTML = ""
        mapRef.current.appendChild(canvas)
      }
    }

    initMap()

    // Handle resize
    const handleResize = () => {
      initMap()
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <div ref={mapRef} className="w-full h-full"></div>
}

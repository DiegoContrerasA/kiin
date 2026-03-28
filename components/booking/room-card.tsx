"use client"

import { Typology } from "@/types/room"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bed, Bath, Maximize, Users, DollarSign } from "lucide-react"

interface RoomCardProps {
  typology: Typology
  onSelect?: (typology: Typology) => void
}

export const RoomCard = ({ typology, onSelect }: RoomCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        {typology.photos && typology.photos.length > 0 ? (
          <img
            src={typology.photos[0]}
            alt={typology.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        {typology.available > 0 && (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            {typology.available} available
          </span>
        )}
      </div>

      {/* Header */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold truncate">{typology.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {typology.description}
            </p>
          </div>
          <div className="text-right ml-4">
            <p className="text-xl font-bold text-primary">
              {formatPrice(typology.price)}
            </p>
            <p className="text-xs text-muted-foreground">per night</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {typology.roomCount && typology.roomCount[0] > 0 && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{typology.roomCount[0]} bed</span>
            </div>
          )}
          {typology.bathroomCount && typology.bathroomCount[0] > 0 && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{typology.bathroomCount[0]} bath</span>
            </div>
          )}
          {typology.squareMeters > 0 && (
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{typology.squareMeters}m²</span>
            </div>
          )}
          {typology.qtyFull > 0 && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{typology.qtyFull} guests</span>
            </div>
          )}
        </div>

        {typology.typeOfBed && (
          <p className="text-sm text-muted-foreground mt-2">
            Bed: <span className="capitalize">{typology.typeOfBed}</span>
          </p>
        )}
      </div>

      <Separator className="my-2" />

      {/* Footer */}
      <div className="p-4 pt-2">
        <Button 
          className="w-full" 
          variant="brand"
          onClick={() => onSelect?.(typology)}
          disabled={typology.available === 0}
        >
          <DollarSign className="h-4 w-4 mr-2" />
          {typology.available === 0 ? "Sold out" : "Book now"}
        </Button>
      </div>
    </div>
  )
}

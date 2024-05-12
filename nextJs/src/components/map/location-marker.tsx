'use client'

import { LatLngTuple, LeafletMouseEvent } from 'leaflet'
import { FC, useState } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'

interface LocationMarkerPropsType {
	onClick?: (location: string) => void
	initialCoords: number[]
}

export const LocationMarker: FC<LocationMarkerPropsType> = ({
	onClick,
	initialCoords,
}) => {
	const [position, setPosition] = useState<number[] | null>(initialCoords)
	const map = useMapEvents({
		click(e: LeafletMouseEvent) {
			if (onClick) {
				setPosition([e.latlng.lat, e.latlng.lng])
				onClick(`${e.latlng.lat}, ${e.latlng.lng}`)
			}
		},
	})

	if (position) {
		return (
			<Marker position={position as LatLngTuple}>
				<Popup>Востаннє був тут.</Popup>
			</Marker>
		)
	}
}

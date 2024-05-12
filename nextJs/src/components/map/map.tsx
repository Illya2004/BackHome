'use client'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet/dist/leaflet.css'
import { CSSProperties } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { LocationMarker } from './location-marker'

interface IMapProps {
	onClick?: () => void
	style: CSSProperties
	coords?: string
}

export default function Map({ onClick, style, coords }: IMapProps) {
	let parts = coords
		? coords.split(',')
		: '50.44960075489513, 30.530620645025966'.split(',')

	let numbers = parts.map(function (item) {
		return parseFloat(item)
	})

	return (
		<MapContainer
			center={{ lat: numbers[0], lng: numbers[1] }}
			zoom={11}
			style={style}
		>
			<TileLayer
				attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
				url='https://api.mapbox.com/styles/v1/tarashuledza/clw2qim8c02g001qr1axebpdx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidGFyYXNodWxlZHphIiwiYSI6ImNsdzJxa3E1YzBudjUyam1xZjBsM2o0N2gifQ.HeXeQ6ass6j0IIkBv2_JbA'
			/>
			<LocationMarker onClick={onClick} initialCoords={numbers} />
		</MapContainer>
	)
}

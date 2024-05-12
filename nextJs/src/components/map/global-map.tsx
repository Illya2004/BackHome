'use client'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import { LocationMarker } from './location-marker'

export default function Map() {
	const coords = [
		'49.039566, 31.402164',
		'50.614136, 25.522487',
		'49.118300, 36.005266',
		'50.378939, 33.632018',
	]

	return (
		<MapContainer
			center={{ lat: 49.039566, lng: 31.402164 }}
			zoom={6}
			style={{ width: '100vw', height: '500px' }}
		>
			<TileLayer
				attribution='© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
				url='https://api.mapbox.com/styles/v1/tarashuledza/clw2qim8c02g001qr1axebpdx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidGFyYXNodWxlZHphIiwiYSI6ImNsdzJxa3E1YzBudjUyam1xZjBsM2o0N2gifQ.HeXeQ6ass6j0IIkBv2_JbA'
			/>
			{coords.map(c => {
				let parts = c.split(',')

				let numbers = parts.map(function (item) {
					return parseFloat(item)
				})
				return <LocationMarker initialCoords={numbers} />
			})}
		</MapContainer>
	)
}

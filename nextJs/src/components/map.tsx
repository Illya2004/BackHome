'use client'
import { IMap } from '@/interfaces/map.interfaces'
import { useState, type FC } from 'react'
import ReactMapGl, { Marker } from 'react-map-gl'
interface IMapProps {
	defaultValues: IMap
}
const Map: FC<IMapProps> = ({ defaultValues }) => {
	// const [initialViewState, setInitialViewState]
	const [mark, setMark] = useState(defaultValues ? defaultValues : null)
	console.log(mark)
	return (
		<div className='w-screen h-screen'>
			<ReactMapGl
				style={{ width: '100vw', height: '100vh' }}
				mapStyle='mapbox://styles/mapbox/streets-v9'
				mapLib={import('mapbox-gl')}
				initialViewState={{
					latitude: 50.44960075489513,
					longitude: 30.530620645025966,
					zoom: 8,
				}}
				onClick={e =>
					setMark({ latitude: e.lngLat.lat, longitude: e.lngLat.lng })
				}
				mapboxAccessToken='pk.eyJ1IjoidGFyYXNodWxlZHphIiwiYSI6ImNsdzI3bHc5cTBkc3Yya211bnNrOW93djQifQ.qr4HuZI_aZnPq8V4M9_x-g'
			>
				{mark && (
					<Marker
						offset={[755, -710]}
						longitude={mark.longitude}
						latitude={mark.latitude}
					></Marker>
				)}
			</ReactMapGl>
		</div>
	)
}

export default Map

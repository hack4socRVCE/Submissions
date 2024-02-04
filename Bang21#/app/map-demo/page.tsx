import dynamic from 'next/dynamic';
import type { MapProps } from '../../components/map/map';

const Map = dynamic(() => import('../../components/map/map'), {
        ssr: false,
});
const kmlFileUrls = [
    '/kml/drains.kml', // Assuming you have example1.kml in the public/kml directory
    '/kml/waterdepth.kml',
    "/kml/flood.kml" // Assuming you have example2.kml in the public/kml directory
    // Add more KML file URLs as needed
  ];
  const iconMapping = {
    'waterdepth': '/icons/yellow.png',
    'flood': '/icons/red.png',
  };
export default function Page() {
    const position: [number, number] = [51.505, -0.09]
    const markers: MapProps['markers'] = [{
        label: 'First location',
        position: [51.505, -0.09],
        color: 'red',
    }, {
        label: 'Second location',
        position: [51.507, -0.07],
        color: 'blue',
    }]

    return <div style={{'height': 600}}>
        <h1>Map Demo</h1>
        <Map key={JSON.stringify({ position, markers })} center={position} markers={markers} kmlFiles={kmlFileUrls} iconMapping={iconMapping} />
    </div>;
}

// 0-1 form
// extract form from messgess, move form shown on left
// subit form sends message
// new prompt to detect intent, etc, pick tools



// map labels
// stryle radio nice buttons
// title and descriptiob for fields
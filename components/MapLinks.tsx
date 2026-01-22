const googleMapsUrl = 'https://maps.app.goo.gl/jxvxKijeoxoJsPgLA';
const appleMapsUrl = 'https://maps.apple.com/place?address=1414%20Dragon%20St,%20Dallas,%20TX%20%2075207,%20United%20States&coordinate=32.791089,-96.819262&name=DEC%20on%20Dragon%20St.&place-id=IC46B1639AFE076E2&map=explore';

const MapLinks: React.FC = () => (
  <ul className='flex flex-col sm:flex-row gap-3 justify-center list-none p-0 m-0'>
    <li>
      <a
        aria-label='Open in Google Maps (opens in new tab)'
        className='block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-center'
        href={googleMapsUrl}
        rel='noopener noreferrer'
        target='_blank'
      >
        Open in Google Maps
      </a>
    </li>
    <li>
      <a
        aria-label='Open in Apple Maps (opens in new tab)'
        className='block bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-center'
        href={appleMapsUrl}
        rel='noopener noreferrer'
        target='_blank'
      >
        Open in Apple Maps
      </a>
    </li>
  </ul>
);
export default MapLinks;

export default function MapLinks() {
  const googleMapsUrl = 'https://maps.app.goo.gl/jxvxKijeoxoJsPgLA';
  const appleMapsUrl = 'https://maps.apple.com/place?address=1414%20Dragon%20St,%20Dallas,%20TX%20%2075207,%20United%20States&coordinate=32.791089,-96.819262&name=DEC%20on%20Dragon%20St.&place-id=IC46B1639AFE076E2&map=explore';

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-center"
      >
        Open in Google Maps
      </a>
      <a
        href={appleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-center"
      >
        Open in Apple Maps
      </a>
    </div>
  );
}

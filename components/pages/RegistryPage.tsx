import {ExternalLink, ShoppingBag} from 'lucide-react';

export default function RegistryPage() {
  return (
    <div className="text-center text-white py-12">
      <h1 className="text-4xl md:text-6xl mb-8 font-league-gothic">Registry</h1>
      <div className="max-w-4xl mx-auto space-y-6 text-lg md:text-xl">
        <p>
          Your presence is the greatest gift, but if you'd like to celebrate with us, here are some
          ideas.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl mb-6 font-league-gothic">Registry Links</h3>
            <div className="space-y-4">
              {/* Crate & Barrel Registry */}
              <a
                href="https://www.crateandbarrel.com/gift-registry/sean-blonien-and-eva-melendez/r7375223"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-colors duration-200 rounded-lg p-4 group"
              >
                <ShoppingBag className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
                <span className="font-league-gothic text-xl">Crate & Barrel</span>
                <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200" />
              </a>

              {/* Amazon Registry */}
              <a
                href="https://www.amazon.com/wedding/share/foreverfest2026"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-colors duration-200 rounded-lg p-4 group"
              >
                <ShoppingBag className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
                <span className="font-league-gothic text-xl">Amazon</span>
                <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200" />
              </a>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-2xl mb-4 font-league-gothic">Honeymoon Fund</h3>
            <p>Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

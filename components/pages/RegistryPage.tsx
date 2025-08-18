import {ExternalLink, Heart, ShoppingBag} from 'lucide-react';

export default function RegistryPage() {
  return (
    <div className="w-full max-w-[600px] mx-auto text-center text-white py-12 px-2 md:px-0">
      <h1 className="text-4xl md:text-6xl mb-8 font-league-gothic">Registry</h1>
      <div className="space-y-8 text-lg md:text-xl">
        <p>
          Your presence is the greatest gift, but if you'd like to give something special, we've
          made it easy to find the perfect present.
        </p>

        {/* Universal Registry */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h3 className="text-2xl mb-4 font-league-gothic">Online Registry</h3>
          <a
            href="https://www.myregistry.com/wedding-website/sean-blonien-and-eva-melendez-dallas-tx/4938687/welcomemessage"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 transition-colors duration-200 rounded-lg p-6 group text-xl font-league-gothic"
          >
            <ShoppingBag className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
            <span>MyRegistry.com</span>
            <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200" />
          </a>
        </div>

        {/* In-Person Gifts Note */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-pink-300" />
            <h3 className="text-2xl font-league-gothic">In-Person Gifts</h3>
            <Heart className="w-6 h-6 text-pink-300" />
          </div>
          <p className="text-base md:text-lg">
            If you prefer not to shop online, in-person gifts at the wedding are absolutely welcome!
            Cards, letters, or any heartfelt gesture you'd like to share with us on our special day
            would mean the world to us.
          </p>
        </div>
      </div>
    </div>
  );
}

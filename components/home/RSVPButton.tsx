import {Button} from '@/components/ui/button';

export function RSVPButton() {
  return (
    <div>
      <p className="text-sm md:text-base italic font-arial  max-w-[600px] mx-auto">
        📥 If you received a Save the Date email or text, please fill out this address
        collection if you have not done so already 🙏
      </p>

      <a href="https://form.jotform.com/251896494421062" target="_blank" rel="noopener noreferrer">
        <Button
          size="lg"
          className="text-2xl md:text-3xl font-black mt-4 py-6 rounded-lg
           bg-gradient-to-r from-penn-blue to-steel-pink text-white
           border-2 border-white
           animate-pulse-glow animate-float
           hover:scale-120
           transition-all duration-500 ease-out"
        >
          Address Collection Form
        </Button>
      </a>
    </div>
  );
}

import {Button} from '@/components/ui/button';

export function RSVPButton() {
  return (
    <div className="pb-12">

      <p className="text-sm md:text-base italic font-arial  max-w-[600px] mx-auto">
        If you received a Save the Date email or text, please fill out this address collection if you have not done so already 🙏
      </p>

      <a href="https://form.jotform.com/251896494421062" target="_blank" rel="noopener noreferrer">
        <Button
          size="lg"
          className="text-2xl md:text-3xl font-black mt-4 y-6 rounded-lg border-4 border-black bg-papaya-whip text-penn-blue hover:scale-105 transition-transform"
        >
          Address Collection Form
        </Button>
      </a>
    </div>
  );
}

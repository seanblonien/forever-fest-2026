import { Button } from "@/components/ui/button"

interface RSVPButtonProps {
  text?: string
  onClick?: () => void
  className?: string
}

export default function RSVPButton({
  text = "RSVP",
  onClick,
  className = ""
}: RSVPButtonProps) {
  return (
    <div className={`pb-12 ${className}`}>
      <Button
        size="lg"
        onClick={onClick}
        className="text-2xl md:text-3xl font-black px-12 py-6 rounded-lg border-4 border-black hover:scale-105 transition-transform"
        style={{
          backgroundColor: "#DE1ACE",
          color: "#101048",
        }}
      >
        {text}
      </Button>
    </div>
  )
}

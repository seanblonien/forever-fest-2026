import Image from "next/image"

interface HeaderProps {
  className?: string
}

export default function Header({
  className = ""
}: HeaderProps) {
  return (
    <div className={`text-center mb-8 ${className}`}>
      {/* Sean & Eva Skyline Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-64 h-auto">
          <Image
            src="/sean_and_eva_skyline.svg"
            alt="Sean & Eva with city skyline"
            width={301}
            height={127}
            className="w-full h-auto opacity-80"
            priority
          />
        </div>
      </div>
    </div>
  )
}

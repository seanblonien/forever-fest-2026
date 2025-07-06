import { ReactNode } from "react"

interface HomePageLayoutProps {
  children: ReactNode
  className?: string
}

export default function HomePageLayout({ 
  children, 
  className = "" 
}: HomePageLayoutProps) {
  return (
    <div
      className={`min-h-screen ${className}`}
      style={{
        background: "linear-gradient(180deg, #101048 0%, #DE1ACE 100%)",
      }}
    >
      {children}
    </div>
  )
}

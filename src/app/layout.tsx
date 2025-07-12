import type { Metadata } from "next"
import LayoutWrapper from "./components/LayoutWrapper"
import "./globals.css"
import "./layout.css"

export const metadata: Metadata = {
  title: "Amiverse Minecraft Server",
  description: "Amiverse Minecraft Server",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <LayoutWrapper>{children}</LayoutWrapper>
    </html>
  )
}

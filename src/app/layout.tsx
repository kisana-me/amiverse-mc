import type { Metadata } from "next"
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
      <body>
        <header>
          <nav>
            <span className="server-name"><a href="/">AMS</a></span>
            <ul>
              <li><a href="/servers">サーバー</a></li>
              <li><a href="/advancements">実績</a></li>
              <li><a href="/stats">統計</a></li>
            </ul>
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer>
          <span>&copy; 2025 Amiverse Minecraft Server. All Rights Reserved.</span>
        </footer>
      </body>
    </html>
  )
}

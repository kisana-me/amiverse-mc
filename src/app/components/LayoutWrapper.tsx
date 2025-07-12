"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState("system")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "system"
    setTheme(storedTheme)
  }, [])

  useEffect(() => {
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      document.documentElement.setAttribute("data-theme", systemTheme)
      localStorage.removeItem("theme")
    } else {
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
  }

  return (
    <body>
      <header>
        <div className="header-content">
          <span className="server-name"><Link href="/" onClick={() => setIsMenuOpen(false)}>AMS</Link></span>
          <button className="menu-button" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <nav>
          <ul>
            <li><Link href="/servers" onClick={toggleMenu}>サーバー</Link></li>
            <li><Link href="/advancements" onClick={toggleMenu}>実績</Link></li>
            <li><Link href="/stats" onClick={toggleMenu}>統計</Link></li>
          </ul>
        </nav>
        <div className="theme-switcher">
          <button onClick={() => handleThemeChange("light")} className={theme === "light" ? "active" : ""}>Light</button>
          <button onClick={() => handleThemeChange("dark")} className={theme === "dark" ? "active" : ""}>Dark</button>
          <button onClick={() => handleThemeChange("system")} className={theme === "system" ? "active" : ""}>System</button>
        </div>
      </div>

      <main>
        {children}
      </main>

      <footer>
        <div className="footer-content">
          <p>&copy; 2025 Amiverse Minecraft Server. All Rights Reserved.</p>
          <div className="footer-links">
            <a href="https://github.com/kisana-me/amiverse-mc" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </footer>
    </body>
  )
}

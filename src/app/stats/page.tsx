import fs from 'fs'
import path from 'path'
import Link from 'next/link'

export default async function StatsPage() {
  const dirPath = path.join(process.cwd(), 'data')
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  const slugs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)

  return (
    <>
      <h1 className="">統計</h1>
      <ul className="">
        {slugs.map((slug) => (
          <li key={slug}>
            <Link href={`/stats/${slug}`} className="">
              {slug}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

import fs from 'fs'
import path from 'path'
import {
  aggregateAllPlayersStatsFromDir,
  diffAllPlayersStatsFromDir,
  convertToCategoryRankings
  
  
} from '../../../libs/stats'
import { uuid2name } from '../../../utils/get_player'

export async function generateStaticParams() {
  const dirPath = path.join(process.cwd(), 'data')
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  const slugs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ slug: entry.name }))

  return slugs
}

type Props = {
  params: { slug: string }
}

// @ts-ignore
export default async function DataPage({ params }) {
  const { slug } = await params

  const dirPath = path.join(process.cwd(), 'data')
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })
  const slugs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
  const sorted = [...slugs].sort()
  const currentIndex = sorted.indexOf(slug)
  const targetSlug = currentIndex > 0 ? sorted[currentIndex - 1] : sorted[0]

  const playersStats = await aggregateAllPlayersStatsFromDir('/data/' + slug + '/stats')

  const playersDiffStats = await diffAllPlayersStatsFromDir('/data/' + targetSlug + '/stats', '/data/' + slug + '/stats')
  const rankings = convertToCategoryRankings(playersDiffStats)

  return (
    <main className="">
      <h1>データ: {slug}</h1>

      <h2>ランキング(前回集計から)</h2>
      <div className="">
        {await Promise.all(
          Object.entries(rankings.stats).map(async ([category, playerMap]) => {
            const rankedList = await Promise.all(
              Object.entries(playerMap).map(async ([uuid, value]) => {
                const name = await uuid2name(uuid)
                return { uuid, name: name ?? uuid, value }
              })
            )

            return (
              <div key={category} className="">
                <details>
                  <summary className="">{category}</summary>
                  <ol className="">
                    {rankedList.map(({ uuid, name, value }) => (
                      <li key={uuid}>
                        <span className="">{name}</span> -{' '}
                        <span className="">{value.toLocaleString()}</span>
                      </li>
                    ))}
                  </ol>
                </details>
              </div>
            )
          })
        )}
      </div>

      <h2 className="">プレイヤー統計</h2>
      <div className="">
        {Object.entries(playersStats.stats).map(([uuid, stats]) => (
          <details key={uuid} className="">
            <summary className="">{uuid2name(uuid)}</summary>
            <ul className="">
              {Object.entries(stats).map(([category, value]) => (
                <li key={category} className="">
                  <span>{category}</span>
                  <span className="">{value.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </main>
  )
}

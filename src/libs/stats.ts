import fs from 'fs/promises'
import path from 'path'

/*
  与えられたファイル名のJSONを読み込み、大分類カテゴリで合計集計する
*/

type MinecraftStats = {
  stats: {
    [category: string]: {
      [item: string]: number
    }
  }
}

type AggregatedStats = {
  stats: {
    [category: string]: number
  }
}

type PlayersStats = {
  stats: {
    [player_uuid: string]: {
      [category: string]: number
    }
  }
}

type RankingStats = {
  stats: {
    [category: string]: {
      [player_uuid: string]: number
    }
  }
}

/*
  カテゴリ別に集計
*/

export async function aggregateStatsByCategory(filePath: string): Promise<AggregatedStats> {
  const fileFullPath = path.join(process.cwd(), filePath)

  const raw = await fs.readFile(fileFullPath, 'utf-8')
  const parsed: MinecraftStats = JSON.parse(raw)

  const result: AggregatedStats = { stats: {} }

  for (const [category, values] of Object.entries(parsed.stats)) {
    const sum = Object.values(values).reduce((a, b) => a + b, 0)
    result.stats[category] = sum
  }

  return result
}

/*
  古いファイル、新しいファイルを受け取り大分類ごとに増分を返す
*/

export async function diffStatsByCategory(
  oldFilePath: string,
  newFilePath: string
): Promise<AggregatedStats> {
  const oldStats = await aggregateStatsByCategory(oldFilePath)
  const newStats = await aggregateStatsByCategory(newFilePath)

  const allKeys = new Set([
    ...Object.keys(oldStats.stats),
    ...Object.keys(newStats.stats),
  ])

  const result: AggregatedStats = { stats: {} }

  for (const key of allKeys) {
    const oldValue = oldStats.stats[key] ?? 0
    const newValue = newStats.stats[key] ?? 0
    result.stats[key] = newValue - oldValue
  }

  return result
}

/*
  全プレイヤーの指定ディレクトリのstatsを返す
*/

export async function aggregateAllPlayersStatsFromDir(dirName: string): Promise<PlayersStats> {
  const dirPath = path.join(process.cwd(), dirName)
  const files = await fs.readdir(dirPath)

  const stats: PlayersStats['stats'] = {}

  for (const file of files) {
    if (!file.endsWith('.json')) continue

    const uuid = file.replace('.json', '')

    try {
      const aggregated = await aggregateStatsByCategory(path.join(dirName, file))
      stats[uuid] = aggregated.stats
    } catch (err) {
      console.warn(`Skipping file ${file}: ${(err as Error).message}`)
    }
  }

  return { stats }
}

export async function diffAllPlayersStatsFromDir(oldDirPath: string, newDirPath: string): Promise<PlayersStats> {
  const oldDirFullPath = path.join(process.cwd(), oldDirPath)
  const newDirFullPath = path.join(process.cwd(), newDirPath)

  const oldFiles = await fs.readdir(oldDirFullPath)
  const newFiles = await fs.readdir(newDirFullPath)

  const stats: PlayersStats['stats'] = {}

  for (const file of newFiles) {
    if (!file.endsWith('.json')) continue

    const uuid = file.replace('.json', '')

    try {
      const diff = await diffStatsByCategory(path.join(oldDirPath, file), path.join(newDirPath, file))
      stats[uuid] = diff.stats
    } catch (err) {
      console.warn(`Skipping file ${file}: ${(err as Error).message}`)
    }
  }

  return { stats }
}

export function convertToCategoryRankings(playersStats: PlayersStats): RankingStats {
  const categoryMap: Record<string, Record<string, number>> = {}

  // データをカテゴリーごとにまとめる
  for (const [uuid, categories] of Object.entries(playersStats.stats)) {
    for (const [category, value] of Object.entries(categories)) {
      if (!categoryMap[category]) {
        categoryMap[category] = {}
      }
      categoryMap[category][uuid] = value
    }
  }

  // 各カテゴリ内で数値を降順でソート
  const sortedCategoryMap: RankingStats['stats'] = {}

  for (const [category, uuidMap] of Object.entries(categoryMap)) {
    const sortedEntries = Object.entries(uuidMap)
      .sort(([, a], [, b]) => b - a)

    sortedCategoryMap[category] = Object.fromEntries(sortedEntries)
  }

  return { stats: sortedCategoryMap }
}
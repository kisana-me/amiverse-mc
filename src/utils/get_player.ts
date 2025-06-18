import path from 'path'
import fs from 'fs/promises'

const mappingPath = path.join(process.cwd(), 'data', 'uuid2name.json')

let cachedMap: Record<string, string> | null = null

// 辞書を一度だけ読み込む
async function loadMapping(): Promise<Record<string, string>> {
  //if (cachedMap) return cachedMap

  const raw = await fs.readFile(mappingPath, 'utf-8')
  cachedMap = JSON.parse(raw)
  return cachedMap || {}
}

/**
  UUIDを名前に変換する関数
*/
export async function uuid2name(uuid: string): Promise<string | null> {
  const map = await loadMapping()
  return map[uuid] ?? null
}

/**
  名前をUUIDに変換する関数
*/
export async function name2uuid(name: string): Promise<string | null> {
  const map = await loadMapping()
  const entry = Object.entries(map).find(([_, value]) => value === name)
  return entry?.[0] ?? null
}

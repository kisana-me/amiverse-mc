import fs from 'fs'
import path from 'path'

type Server = {
  server_id: string
  server_name: string
  server_description: string
}

const filePath = path.join(process.cwd(), 'data', 'servers.json')

export function getAllServers(): Server[] {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const servers: Server[] = JSON.parse(fileContents)
  return servers
}

export function getAllServerIds() {
  const servers = getAllServers()
  return servers.map(server => {
    return {
      server_id: server.server_id
    }
  })
}

export function getServerData(id: string): Server | undefined {
  const servers = getAllServers()
  return servers.find(server => server.server_id === id)
}

import { getAllServerIds, getServerData } from '@/libs/servers'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const paths = getAllServerIds()
  return paths
}

export default async function MapPage({ params }: { params: Promise<{ server_id: string }> }) {
  const { server_id } = await params
  const server = await getServerData(server_id)

  if (!server) {
    notFound()
  }

  const mapUrl = `https://mc-map.amiverse.net/${server.server_id}`

  const frameStyle: React.CSSProperties = {
    width: '100%',
    height: 'calc(100vh - 74px)',
    border: 'none'
  }

  return (
    <>
      <iframe className="map-frame main-no-padding" src={mapUrl} style={frameStyle}></iframe>
    </>
  )
}

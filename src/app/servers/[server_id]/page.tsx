import { getAllServerIds, getServerData } from '@/libs/servers'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const paths = getAllServerIds()
  return paths
}

export default async function ServerPage({ params }: { params: Promise<{ server_id: string }> }) {
  const {server_id} = await params
  const server = getServerData(server_id)

  if (!server) {
    notFound()
  }

  return (
    <div className="container">
      <h1>{server.server_name}</h1>
      {server.server_description.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}
      <Link href={`/servers/${server.server_id}/map`}>{server.server_name}サーバーのマップ</Link>
    </div>
  )
}

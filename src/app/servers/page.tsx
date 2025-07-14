import { getAllServers } from '@/libs/servers'
import Link from 'next/link'

export default function Servers() {
  const servers = getAllServers()

  return (
    <>
      <div className="container">
        <h1>サーバー</h1>
        <p>AMSは以下のサーバー群から成り立っています。</p>
        <ol>
          {servers.map((server) => (
            <li key={server.server_id}>
              {server.server_name}
            </li>
          ))}
        </ol>
        {servers.map((server) => (
          <div key={server.server_id}>
            <h2>{server.server_name}</h2>
            {server.server_description.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
            <Link href={`/servers/${server.server_id}/map`}>{server.server_name}サーバーのマップ</Link>
          </div>
        ))}
        <h2>その他</h2>
        <p>現在は使用の目途が立っていません。</p>
      </div>
    </>
  )
}

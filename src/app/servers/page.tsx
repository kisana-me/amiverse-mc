"use client"

export default function Servers() {

  return (
    <>
      <div className="container">
        <h1>サーバー</h1>
        <p>AMSは以下のサーバー群から成り立っています。</p>
        <ol>
          <li>ロビー</li>
          <li>サバイバル</li>
          <li>クリエイティブ</li>
          <li>資源</li>
          <li>企画</li>
          <li>臨時</li>
          <li>CIT</li>
        </ol>

        <h2>ロビー</h2>
        <p>特別なことがない限り、常に開いています。</p>
        <p>特にすることはなく、観光やアスレチックとしてお楽しみください。</p>
        <p>クリエイティブサーバーですごい建築したら、このロビーサーバーにもってきて飾ります。</p>
        <a href="/servers/lobby/map">ロビーサーバーのマップ</a>

        <h2>サバイバル</h2>
        <p>サバイバル生活をお楽しみください。</p>
        <p>複数ワールドがあります。</p>
        <p>建築を他プレイヤーに邪魔されたくない場合は、スポーン地点から離れた場所で、土地の保護を有効にしてください。</p>
        <a href="/servers/survival/map">サバイバルサーバーのマップ</a>

        <h2>CITサーバー</h2>
        <p>CITの人のみ参加可能で、専用のDiscordサーバーと認証があります。</p>
        <a href="/servers/cit/map">CITサーバーのマップ</a>

        <h2>その他</h2>
        <p>現在は使用の目途が立っていません。</p>
      </div>
      <style jsx>{`
        .container {
        }
      `}</style>
    </>
  )
}

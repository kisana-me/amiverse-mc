"use client"

import { useEffect, useCallback } from 'react'

export default function Home() {

  return (
    <>
      <div className="container">
        <div className="background-animation"></div>
        <div>
          <section className="hero">
            <div className="hero-content">
              <h1 className="main-title">新たな冒険が、ここから始まる。</h1>
              <p className="subtitle">探検、建築、そしてサバイバル。私たちと共に、最高のMinecraft体験を。</p>
              <a href="#join" className="cta-button">今すぐ参加</a>
            </div>
          </section>

          <section id="about" className="content-section fade-in-section">
            <h2 className="section-title">Amiverse MCへようこそ</h2>
            <p className="section-text">
              Amiverse MCは、プレイヤーコミュニティを第一に考えるサバイバルサーバーです。
              巨大プロジェクトでの協力、プレイヤー主導の経済、そして定期的に開催されるイベント。
              私たちは、すべてのプレイヤーの創造性、チームワーク、そして互いへの敬意を大切にしています。
            </p>
          </section>

          <section id="join" className="content-section fade-in-section">
            <h2 className="section-title">サーバーへの参加方法</h2>
            <p className="section-text">参加は簡単！Minecraftクライアントにサーバーアドレスを追加するだけです。</p>
            <div className="server-address-box">
              <p className="server-address">Discordに参加してください</p>
            </div>
            <p className="section-text">
              サーバーはJava EditionとBedrock Editionの最新バージョンから参加可能です。
            </p>
          </section>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
        }
        
        .background-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: linear-gradient(
            -45deg,
            #0e1427,
            #1a2a6c,
            #b21f1f,
            #fdbb2d
          );
          background-size: 400% 400%;
          animation: gradientBG 25s ease infinite;
        }

        @keyframes gradientBG {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 2rem;
        }
        
        .hero-content {
          max-width: 900px;
        }
        
        .main-title {
          font-size: 4.5rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          line-height: 1.2;
          background: -webkit-linear-gradient(45deg, #a29bfe, #6c5ce7, #fd79a8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .subtitle {
          font-size: 1.5rem;
          margin-bottom: 2.5rem;
          color: #e0e0e0;
        }
        
        .cta-button {
          background: linear-gradient(45deg, #6c5ce7, #a29bfe);
          color: white;
          padding: 1rem 3rem;
          border-radius: 50px;
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: bold;
          transition: transform 0.3s, box-shadow 0.3s;
          border: none;
          box-shadow: 0 0 20px rgba(108, 92, 231, 0.5);
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 30px rgba(108, 92, 231, 0.8);
        }

        .content-section {
          padding: 6rem 2rem;
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
          background: var(--card-bg);
          border-radius: 16px;
          margin-bottom: 4rem;
          border: 1px solid var(--card-border);
          backdrop-filter: blur(5px);
        }
        
        .section-title {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 2rem;
          color: #fff;
        }
        
        .section-text {
          font-size: 1.1rem;
          line-height: 1.8;
          max-width: 800px;
          margin: 0 auto 1.5rem auto;
          color: #c0c0c0;
        }
        
        .server-address-box {
          background: rgba(0, 0, 0, 0.3);
          border: 2px dashed var(--primary-glow);
          padding: 2rem;
          margin: 2rem auto;
          display: inline-block;
          border-radius: 8px;
        }
        
        .server-address {
          font-family: 'Courier New', Courier, monospace;
          font-size: 2rem;
          font-weight: bold;
          color: #fff;
          margin: 0;
          text-shadow: 0 0 10px var(--primary-glow);
        }
      `}</style>
    </>
  );
}

"use client"

import "./style.css"
import { useState, useEffect, useCallback } from 'react'

const images = [
  '/images/1.png',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png'
]

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentImageIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const goToNext = useCallback(() => {
    const isLastImage = currentImageIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  }, [currentImageIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000); // 5秒ごとに画像を切り替え

    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <>
      <div className="container home-page">
        <div className="background-animation"></div>
        <div>
          <section className="hero">
            <div className="slideshow-container">
              <div
                className="slideshow-slider"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {images.map((src, index) => (
                  <img key={index} src={src} alt={`Slide ${index + 1}`} className="slide-image" />
                ))}
              </div>
            </div>
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1 className="main-title">新たな冒険が、ここから始まる。</h1>
              <p className="subtitle">探検、建築、そしてサバイバル。私たちと共に、最高のMinecraft体験を。</p>
              <a href="#join" className="cta-button">今すぐ参加</a>
            </div>
            <div className="dots-container">
              <button className="arrow" onClick={goToPrevious}>&#10094;</button>
              <div className="dots">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`dot ${currentImageIndex === index ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  ></div>
                ))}
              </div>
              <button className="arrow" onClick={goToNext}>&#10095;</button>
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
    </>
  )
}

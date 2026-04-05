'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

/* High-value Simplified Chinese Pokemon cards only (AR / SR / SAR / UR / Full Art) */
const ROW1 = [
  '/images/CSV5C155.jpg',    // Charizard ex SAR - 喷火龙
  '/images/CBB4C0907.png',   // Infernape SR - 烈焰猴
  '/images/CSV8C244.jpg',    // Milotic ex SAR - 美纳斯
  '/images/CBB2C0915.png',   // Sylveon AR - 仙子伊布
  '/images/vol5-card08.png', // Magneton SAR - 三合一磁怪
  '/images/CSV5C135.jpg',    // Yveltal AR - 伊裴尔塔尔
  '/images/CBB3C1904.png',   // Pepper trainer full art
  '/images/CSV7C209.jpg',    // Metagross AR - 巨金怪
  '/images/CBB4C2307.png',   // Mudsdale AR - 重泥挽马
  '/images/CSV5C130.jpg',    // Gloom AR - 臭臭花
  '/images/vol5-card03.png', // Captain Pikachu AR - 船长皮卡丘
  '/images/CBB2C0115.png',   // Eevee AR - 伊布
]

const ROW2 = [
  '/images/CSV7C245.jpg',    // Trainer SAR - 暗码迷的解读
  '/images/CBB4C2007.png',   // Litten AR - 火斑喵
  '/images/CSV7C205.jpg',    // Shiftry AR - 按猎天狗
  '/images/CBB3C0207.png',   // Meowth AR - 喵喵
  '/images/CSV8C255.jpg',    // Trainer SAR - 丹瑜
  '/images/CBB3C1607.png',   // Greavard AR - 墓仔狗
  '/images/CSV7C206.jpg',    // Iron Thorns AR - 铁荆棘
  '/images/vol5-card06.png', // Crocalor AR - 炙烫鳄
  '/images/CBB4C0607.png',   // Torkoal AR - 煤炭龟
  '/images/vol5-card12.png', // Wiglett pop art AR - 米立龙
  '/images/CBB4C1907.png',   // Heliolisk AR - 光电伞蜥
  '/images/CBB1C1703.png',   // Ultra Ball Gold - 高级球
]

function MarqueeRow({
  items,
  direction,
  onCardClick,
}: {
  items: string[]
  direction: 'left' | 'right'
  onCardClick: () => void
}) {
  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex gap-3 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
        style={{ width: 'max-content' }}
      >
        {doubled.map((src, i) => (
          <button
            key={`${src}-${i}`}
            className="relative flex-shrink-0 w-[160px] md:w-[200px] aspect-[2/3] rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-secondary/60 transition-all"
            onClick={onCardClick}
          >
            <Image
              src={src}
              alt="Pokemon Card"
              fill
              className="object-cover"
              sizes="200px"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default function HeroMarquee() {
  const router = useRouter()

  const goToHistory = () => {
    router.push('/history')
  }

  return (
    <div className="space-y-3">
      <MarqueeRow items={ROW1} direction="left" onCardClick={goToHistory} />
      <MarqueeRow items={ROW2} direction="right" onCardClick={goToHistory} />
    </div>
  )
}

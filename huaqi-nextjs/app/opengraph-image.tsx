import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(160deg, #06080b 0%, #0d1420 50%, #06080b 100%)',
          position: 'relative',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: '0px',
            left: '300px',
            width: '600px',
            height: '2px',
            background:
              'linear-gradient(90deg, transparent, #c9a84c 30%, #c9a84c 70%, transparent)',
            display: 'flex',
          }}
        />

        {/* Top-left glow */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            left: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '200px',
            background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Bottom-right glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            right: '-60px',
            width: '350px',
            height: '350px',
            borderRadius: '175px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '0px',
            left: '450px',
            width: '300px',
            height: '2px',
            background:
              'linear-gradient(90deg, transparent, rgba(201,168,76,0.3) 30%, rgba(201,168,76,0.3) 70%, transparent)',
            display: 'flex',
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #c9a84c 0%, #f1d392 50%, #d4a843 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '28px',
            boxShadow: '0 0 40px rgba(201,168,76,0.3)',
          }}
        >
          <span
            style={{
              fontSize: '36px',
              fontWeight: 900,
              color: '#120d04',
              letterSpacing: '-0.05em',
            }}
          >
            華
          </span>
        </div>

        {/* Company name */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 900,
              color: '#e8e4d9',
              letterSpacing: '0.05em',
              lineHeight: 1,
              marginBottom: '10px',
            }}
          >
            華啓未来
          </div>
          <div
            style={{
              fontSize: '22px',
              fontWeight: 400,
              color: '#c9a84c',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
            }}
          >
            HUAQI FUTURE INC.
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '80px',
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)',
            marginBottom: '24px',
            display: 'flex',
          }}
        />

        {/* Tagline - two-line flex column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '26px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.08em',
            textAlign: 'center',
            maxWidth: '720px',
            lineHeight: 1.6,
          }}
        >
          <span>中国正規発売ポケモンカード × 越境貿易</span>
          <span>日中間の商流設計を一貫して担当</span>
        </div>
      </div>
    ),
    { ...size }
  )
}

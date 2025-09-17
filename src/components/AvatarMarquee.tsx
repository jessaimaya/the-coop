'use client'

import Marquee from 'react-fast-marquee'

export default function AvatarMarquee() {
  return (
    <div className="nosotros-personas">
      <Marquee speed={80} gradient={false} autoFill>
        {[1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8].map((avatarNum, index) => (
          <div key={index} className="avatar-container">
            <img
              src={`/images/avatar_${avatarNum}.png`}
              alt={`Team member ${avatarNum}`}
              width={120}
              height={120}
              className="avatar-image"
            />
          </div>
        ))}
      </Marquee>
    </div>
  )
}

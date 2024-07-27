function isOverlappingX(playerBounds, platformBounds) {
  return (
    playerBounds.x + playerBounds.width > platformBounds.x &&
    playerBounds.x < platformBounds.x + platformBounds.width
  )
}

function isAbove(playerBounds, platformBounds) {
  return playerBounds.y + playerBounds.height / 4 <= platformBounds.y
}

export function rectIntersectDown(playerBounds, platformBounds) {
  return (
    isOverlappingX(playerBounds, platformBounds) &&
    isAbove(playerBounds, platformBounds)
  )
}

export function detectPlatformGround(player, platforms) {
  let ground
  const playerBounds = player.sprite.getBounds()
  for (let i = 0; i < platforms.length; i++) {
    let platform = platforms[i]
    let platformBounds = platform.getBounds()
    if (rectIntersectDown(playerBounds, platformBounds)) {
      if (!ground) {
        ground = platformBounds.minY
      } else if (ground > platformBounds.minY) {
        ground = platformBounds.minY
      }
    } else if (!ground) {
      ground = 900
    }
  }
  return ground
}

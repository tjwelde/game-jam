function isOverlappingX(player, platform) {
  return (
    player.x + player.width > platform.x &&
    player.x < platform.x + platform.width
  );
}

function isAbove(player, platform, index) {
  return player.y + player.height <= platform.y;
}

export function rectIntersectDown(player, platform, index) {
  const playerBounds = player.getBounds();
  const platformBounds = platform.getBounds();
  return (
    isOverlappingX(playerBounds, platformBounds) &&
    isAbove(playerBounds, platformBounds, index)
  );
}

export function detectPlatformGround(player, platforms) {
  let ground;
  for (let i = 0; i < platforms.length; i++) {
    let platform = platforms[i];
    let platformBounds = platform.getBounds();
    if (rectIntersectDown(player, platform, i)) {
      if (!ground) {
        ground = platformBounds.minY;
      } else if (ground > platformBounds.minY) {
        ground = platformBounds.minY;
      }
    }
  }
  return ground;
}

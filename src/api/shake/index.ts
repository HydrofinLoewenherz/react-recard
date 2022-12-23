export interface ShakeOptions {
  checkInterval: number
  magThreshold: number
}

const DefaultShakeOptions: ShakeOptions = {
  checkInterval: 100,
  magThreshold: 50
}

export interface ShakeHandlerContext {
  options: ShakeOptions,
  shake: Orientation
}

/** Handles any shake event,  */
export type ShakeHandler = (ctx: ShakeHandlerContext) => (boolean | void)

export class Orientation {
  constructor(public x: number, public y: number, public z: number) {}

  mag(): number {
    return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
  }

  diff(other: Orientation): Orientation {
    return new Orientation(
      this.x - other.x,
      this.y - other.y,
      this.z - other.z);
  };
}

// register global listener for all handlers
let lastEvent: DeviceOrientationEvent | null = null
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', (ev) => {
    lastEvent = ev
  })
}

export function onShake(handler: ShakeHandler, options?: Partial<ShakeOptions>): boolean {
  if (!window.DeviceOrientationEvent) {
    return false
  }
  const completeOptions: ShakeOptions = {
    ...DefaultShakeOptions,
    ...(options || {}),
  }

  let lastOrientation: Orientation | null = null
  const interval = setInterval(() => {
    if (lastEvent === null) {
      return
    }

    const newOrientation = new Orientation(
      lastEvent.beta || 0,
      lastEvent.gamma || 0,
      lastEvent.alpha || 0,
    )

    // check if shaken
    if (lastOrientation !== null) {
      const shake = lastOrientation.diff(newOrientation)
      if (shake.mag() > completeOptions.magThreshold) {
        console.debug(`detected device shake of and mag ${shake.mag()}`, shake)
        // handle shake and check for discontinue
        if (handler({
          options: completeOptions,
          shake: shake
        })) {
          console.info(`stopping shake listen`)
          clearInterval(interval)
        }
      }
    }

    lastOrientation = newOrientation
  }, completeOptions.checkInterval)

  return true
}

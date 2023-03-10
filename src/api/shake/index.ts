/** Options for registering a shake handler. */
export interface ShakeOptions {
  /** ... (in m/s^2) */
  magThreshold: number
  /** ... (in [0,1]) */
  dirThreshold: number
  /** ... (in ms) */
  debounce: number
}

const DefaultShakeOptions: ShakeOptions = {
  magThreshold: 10,
  dirThreshold: 0.8,
  debounce: 300,
}

/** Supported discrete types of shakes to differentiate between. */
export type Type = 'shakeLeft' | 'shakeRight'

/** The context in witch a shake happens, hods metadata about the shake. */
export interface ShakeHandlerContext {
  options: ShakeOptions
  motion: DeviceMotionEvent
  type?: Type
  magnitude: number
}

/** Handles any shake event, with given context of the shake. */
export type ShakeHandler = (ctx: ShakeHandlerContext) => void

/** Registers a handler for a shake event. Returns 'false' if not supported or a function to stop the event listener. */
export function onShake(handler: ShakeHandler, options?: Partial<ShakeOptions>) {
  if (!window.DeviceOrientationEvent) {
    return false
  }
  const completeOptions: ShakeOptions = {
    ...DefaultShakeOptions,
    ...(options || {}),
  }
  let lastCallTime = new Date().getTime()

  const handle = (ev: DeviceMotionEvent) => {
    const acc = ev.acceleration
    if (acc === null) {
      return
    }

    const acc_x = acc.x || 0
    const acc_y = acc.y || 0
    const acc_z = acc.z || 0
    const mag = Math.sqrt(acc_x * acc_x + acc_y * acc_y + acc_z * acc_z)

    const currTime = new Date().getTime()
    if (mag > completeOptions.magThreshold && currTime - lastCallTime > completeOptions.debounce) {
      //console.debug(`detected shake with mag ${mag}`, ev.acceleration)
      lastCallTime = new Date().getTime()
      handler({
        options: completeOptions,
        motion: ev,
        type: Math.abs(acc_x) < completeOptions.dirThreshold * mag ? undefined : acc_x < 0 ? 'shakeLeft' : 'shakeRight',
        magnitude: mag,
      })
    }
  }
  window.addEventListener('devicemotion', handle)

  return () => window.removeEventListener('devicemotion', handle)
}

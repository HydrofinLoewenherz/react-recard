export interface ShakeOptions {
  magThreshold: number
}

const DefaultShakeOptions: ShakeOptions = {
  magThreshold: 15
}

export interface ShakeHandlerContext {
  options: ShakeOptions,
  motion: DeviceMotionEvent
}

/** Handles any shake event,  */
export type ShakeHandler = (ctx: ShakeHandlerContext) => (boolean | void)

// register global listener for all handlers
const handlers: Record<string, { handler: ShakeHandler, options: ShakeOptions }> = {}
if (window.DeviceOrientationEvent) {
  window.addEventListener('devicemotion', (ev) => {
    if (ev.acceleration === null) {
      return
    }

    Object.entries(handlers)
      .forEach(([key, { handler, options }]) => {
        const acc = ev.acceleration
        const acc_x = acc!.x || 0
        const acc_y = acc!.y || 0
        const acc_z = acc!.z || 0

        const mag = Math.sqrt((acc_x * acc_x) + (acc_y * acc_y) + (acc_z * acc_z));
        if (mag > options.magThreshold) {
          console.debug(`detected shake with mag ${mag}`)
          if (handler({
            options: options,
            motion: ev
          })) {
            console.debug(`stopping shake listen ${key}`)
            delete handlers[key]
          }
        }
    })
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
  const key = (Math.random() + 1).toString(36).substring(7)
  console.debug(`adding shake handler as ${key}`)
  handlers[key] = {
    handler,
    options: completeOptions
  }
  return true
}

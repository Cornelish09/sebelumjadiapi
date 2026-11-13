export interface SceneFrame {
  x: number
  y: number
  lightX: number
  lightY: number
  presence: number
}

// Pegas teredam: pointer tidak pernah langsung mengubah posisi layer.
export class ParallaxController {
  frame: SceneFrame = { x: 0, y: 0, lightX: 0.65, lightY: 0.5, presence: 0 }
  private target = { x: 0, y: 0, lightX: 0.65, lightY: 0.5, presence: 0 }
  private vx = 0
  private vy = 0

  point(x: number, y: number) {
    this.target = { x: (x - 0.5) * 2, y: (y - 0.5) * 2, lightX: x, lightY: 1 - y, presence: 1 }
  }

  leave() {
    this.target.x = this.target.y = this.target.presence = 0
  }

  step(dt: number): SceneFrame {
    const delta = Math.min(dt, 0.035)
    const damping = Math.exp(-8.5 * delta)
    this.vx = (this.vx + (this.target.x - this.frame.x) * 24 * delta) * damping
    this.vy = (this.vy + (this.target.y - this.frame.y) * 24 * delta) * damping
    this.frame.x += this.vx * delta
    this.frame.y += this.vy * delta
    const follow = 1 - Math.exp(-5.5 * delta)
    this.frame.lightX += (this.target.lightX - this.frame.lightX) * follow
    this.frame.lightY += (this.target.lightY - this.frame.lightY) * follow
    this.frame.presence += (this.target.presence - this.frame.presence) * (1 - Math.exp(-2.6 * delta))
    return this.frame
  }
}

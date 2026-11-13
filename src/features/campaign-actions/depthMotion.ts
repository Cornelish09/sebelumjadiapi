import type { PointerEvent } from 'react'

export const forest = {
  background: '/assets/hero/forest-background-soft.webp',
  tree: '/assets/hero/tree-layer.webp',
  foreground: '/assets/hero/foreground-layer.webp',
  canopy: '/assets/hero/canopy-layer.webp',
  still: '/assets/hero/forest-clean-soft.webp',
}

function updatePointerDepth(element: HTMLElement, clientX: number, clientY: number) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const rect = element.getBoundingClientRect()
  if (!rect.width || !rect.height) return
  const x = Math.max(-1, Math.min(1, (clientX - rect.left) / rect.width * 2 - 1))
  const y = Math.max(-1, Math.min(1, (clientY - rect.top) / rect.height * 2 - 1))
  element.style.setProperty('--depth-x', String(x))
  element.style.setProperty('--depth-y', String(y))
}

export function setDepth(event: PointerEvent<HTMLElement>) {
  if (event.pointerType === 'touch') return
  updatePointerDepth(event.currentTarget, event.clientX, event.clientY)
}

export function resetDepth(event: PointerEvent<HTMLElement>) {
  event.currentTarget.removeAttribute('data-held')
  event.currentTarget.style.removeProperty('--depth-x')
  event.currentTarget.style.removeProperty('--depth-y')
}

export function holdDepth(event: PointerEvent<HTMLElement>) {
  event.currentTarget.dataset.held = 'true'
  updatePointerDepth(event.currentTarget, event.clientX, event.clientY)
}

export function releaseDepth(event: PointerEvent<HTMLElement>) {
  event.currentTarget.removeAttribute('data-held')
  if (event.pointerType === 'touch') {
    event.currentTarget.style.removeProperty('--depth-x')
    event.currentTarget.style.removeProperty('--depth-y')
  }
}

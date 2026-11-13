import type { ReactNode } from 'react'
import { forest, resetDepth, setDepth } from './depthMotion'
import './campaignActions.css'

export function ForestLayers({ image = forest.background, tree = false }: { image?: string; tree?: boolean }) {
  return <span className="ca-layers" aria-hidden="true">
    <img className="ca-layer-back" src={image} alt="" loading="lazy" decoding="async" />
    {tree && <img className="ca-layer-tree" src={forest.tree} alt="" loading="lazy" decoding="async" />}
    <span className="ca-layer-light" />
    <img className="ca-layer-canopy" src={forest.canopy} alt="" loading="lazy" decoding="async" />
    <img className="ca-layer-front" src={forest.foreground} alt="" loading="lazy" decoding="async" />
    <span className="ca-layer-shade" />
  </span>
}

export function DepthScene({ image, tree, children, className = '' }: {
  image?: string
  tree?: boolean
  children?: ReactNode
  className?: string
}) {
  return <div className={`ca-depth ${className}`} onPointerMove={setDepth} onPointerLeave={resetDepth}>
    <ForestLayers image={image} tree={tree} />
    {children && <div className="ca-depth-content">{children}</div>}
  </div>
}

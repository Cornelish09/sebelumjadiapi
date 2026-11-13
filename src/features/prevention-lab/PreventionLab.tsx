import { useEffect, useReducer, useRef } from 'react'
import { preventionScenarios } from '../../content/preventionLab'
import { ChapterLink } from '../campaign-actions/Controls'
import { DepthScene } from '../campaign-actions/DepthScene'
import { initialLabState, labReducer } from './labState'
import './preventionLab.css'

const plates = [
  '/assets/images/before-the-fire/forest-drying.webp',
  '/assets/images/why-it-matters/forest-scene.webp',
  '/assets/images/before-the-fire/forest-burning.webp',
]

export function PreventionLab() {
  const [state, dispatch] = useReducer(labReducer, undefined, initialLabState)
  const heading = useRef<HTMLHeadingElement>(null)
  const previous = useRef(0)
  const scenario = preventionScenarios[state.step]
  const answer = state.answers[state.step]
  const answered = answer != null

  useEffect(() => {
    if (previous.current !== state.step) {
      const title = heading.current
      title?.focus({ preventScroll: true })
      if (title && title.getBoundingClientRect().top < 50) {
        title.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
      }
      previous.current = state.step
    }
  }, [state.step])

  return <section id="prevention-lab" className="ca-section prevention-lab" aria-labelledby="lab-title">
    <div className="ca-wrap">
      <header className="ca-heading lab-heading">
        <h2 id="lab-title">The Prevention Lab</h2>
        <p>Simulasi keputusan. Pilih tindakan di tiap situasi, lalu lihat alasannya.</p>
      </header>
      <article key={state.step} className="lab-stage">
        <DepthScene
          image={scenario ? plates[state.step] : '/assets/hero/forest-clean-soft.webp'}
          className="lab-plate"
        >
          <div className="lab-plate-index" aria-hidden="true">
            <span>{scenario ? `0${state.step + 1}` : '03'}</span>
            <i />
            <span>03</span>
          </div>
        </DepthScene>
        <div className="lab-case">
          {scenario ? <>
            <h3 ref={heading} tabIndex={-1}>{scenario.topic}</h3>
            <p className="lab-scene">{scenario.scene}</p>
            <h4>{scenario.question}</h4>
            <div className="lab-options" role="group" aria-label={scenario.question}>
              {scenario.options.map((option, index) => <button
                type="button" key={option} aria-pressed={answer === index}
                onClick={() => dispatch({ type: 'answer', option: index })}
              >
                <span aria-hidden="true">{String.fromCharCode(65 + index)}</span>
                <span>{option}</span>
                <span aria-hidden="true">{answer === index ? '●' : '○'}</span>
              </button>)}
            </div>
            {answered && <div className="lab-response" role="status" data-correct={answer === scenario.correct}>
              <strong>{answer === scenario.correct ? 'Pilihan tepat' : 'Belum tepat'}</strong>
              <p>{scenario.reason}</p>
              <a className="ca-source" href={scenario.sourceUrl} target="_blank" rel="noreferrer">{scenario.sourceName} ↗</a>
            </div>}
          </> : <>
            <h3 ref={heading} tabIndex={-1}>Kurangi risiko kebakaran dari sumbernya.</h3>
            <p className="lab-scene">Jaga gambut tetap basah dan pilih cara membuka lahan tanpa bakar. Jika terlihat indikasi kebakaran, laporkan melalui kanal resmi dari tempat aman.</p>
            <ChapterLink id="take-action" primary>Mulai Take Action ↓</ChapterLink>
          </>}
          {(state.step > 0 || answered) && <div className="ca-tools lab-navigation">
            {state.step > 0 && <button className="ca-button" type="button" onClick={() => dispatch({ type: 'back' })}>← Kembali</button>}
            {scenario && answered && <button className="ca-button ca-primary" type="button" onClick={() => dispatch({ type: 'next' })}>
              {state.step === 2 ? 'Lihat penutup' : 'Situasi berikutnya →'}
            </button>}
          </div>}
        </div>
      </article>
    </div>
  </section>
}


import campaign from '../../content/campaign.json'

export function Disclaimer() {
  return (
    <footer className="site-footer">
      <p>{campaign.disclaimer}</p>
    </footer>
  )
}

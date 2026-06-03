import Link from 'next/link'

export default function ScoreMyResponseWidget() {
  return (
    <div className="he-score">
      <div className="he-score__stamp">Free</div>
      <h4>Score My Response</h4>
      <p>Upload your draft. Get an evaluator-grade score in 72 hours.</p>
      <Link href="/score-my-response" className="he-score__link">
        Try it →
      </Link>
    </div>
  )
}

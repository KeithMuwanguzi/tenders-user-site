import Link from 'next/link'

export default function ScoreMyResponseWidget() {
  return (
    <div className="he-score">
      <div className="he-score__stamp">Free</div>
      <h4>Score My Response</h4>
      <p>Paste your draft and review it against the question, scoring criteria and evidence available.</p>
      <Link href="/services/pre-submission-review" className="he-score__link">
        Review a response →
      </Link>
    </div>
  )
}

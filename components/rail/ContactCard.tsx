export default function ContactCard() {
  return (
    <div className="he-contact">
      <h4>Speak to us directly</h4>
      <div className="he-contact__row">
        <b>Call</b>{' '}
        <a href="tel:01707240393">01707 240393</a>
      </div>
      <div className="he-contact__row">
        <b>Email</b>{' '}
        <a href="mailto:info@tenderlab.co.uk">info@tenderlab.co.uk</a>
      </div>
      <div className="he-contact__row">
        <b>Hours</b> Mon-Fri 9am-6pm UK
      </div>
    </div>
  )
}

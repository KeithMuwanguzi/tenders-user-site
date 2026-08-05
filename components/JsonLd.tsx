type JsonLdProps = {
  data: unknown | unknown[]
  id?: string
  idPrefix?: string
}

export default function JsonLd({ data, id, idPrefix = 'json-ld' }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data]

  return (
    <>
      {items.map((item, index) => (
        <script
          key={`${id ?? idPrefix}-${index}`}
          id={items.length === 1 && id ? id : `${idPrefix}-${index + 1}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  )
}

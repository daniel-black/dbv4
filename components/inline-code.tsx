export function InlineCode(props: { code: string }) {
  return <code className="border px-1 rounded bg-secondary">{props.code}</code>;
}

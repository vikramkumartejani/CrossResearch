import { redirect } from 'next/navigation'

/** Architecture root for research taxonomy - lands on the macro hub. */
export default function ResearchIndexPage() {
  redirect('/research/macro')
}

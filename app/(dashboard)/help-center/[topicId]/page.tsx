import HelpTopic from '@/app/components/Dashboard/HelpCenter/HelpTopic'

export default async function HelpTopicPage({
  params,
}: {
  params: Promise<{ topicId: string }>
}) {
  const { topicId } = await params
  return (
    <div>
      <HelpTopic topicId={topicId} />
    </div>
  )
}

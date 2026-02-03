import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import "@/styles/markdown-theme.css"

export const MarkdownRenderer = ({ content }) => {
  return (
    <div className="markdown-ai">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

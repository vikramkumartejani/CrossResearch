'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import { TextStyle, FontSize } from '@tiptap/extension-text-style'
import { useEffect, useRef } from 'react'

const FONT_SIZES = ['12px', '14px', '16px', '18px', '20px', '24px', '28px']

interface RichTextEditorProps {
    content: string
    onChange: (html: string) => void
    editable?: boolean
}

export default function RichTextEditor({ content, onChange, editable = true }: RichTextEditorProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3] },
            }),
            Underline,
            TextStyle,
            FontSize,
            Image.configure({
                inline: false,
                allowBase64: true,
                HTMLAttributes: {
                    class: 'max-w-full h-auto my-4 border border-[#FFFFFF14]',
                },
            }),
        ],
        content,
        editable,
        immediatelyRender: false,
        onUpdate: ({ editor: ed }) => {
            onChange(ed.getHTML())
        },
        editorProps: {
            attributes: {
                class:
                    'outline-none min-h-[280px] text-white/80 text-[15px] leading-7 max-w-none ' +
                    '[&_strong]:text-white [&_em]:text-white/90 [&_u]:text-white/90 ' +
                    '[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 ' +
                    '[&_li]:mb-1 [&_p]:mb-3 [&_h2]:text-white [&_h2]:text-[20px] [&_h2]:font-medium [&_h2]:mb-3 ' +
                    '[&_h3]:text-white [&_h3]:text-[17px] [&_h3]:font-medium [&_h3]:mb-2 ' +
                    '[&_a]:text-[#88C4FF]',
            },
        },
    })

    useEffect(() => {
        if (!editor) return
        editor.setEditable(editable)
    }, [editor, editable])

    useEffect(() => {
        if (!editor) return
        const current = editor.getHTML()
        if (content !== current) {
            editor.commands.setContent(content, { emitUpdate: false })
        }
    }, [content, editor])

    async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0]
        if (!file || !editor) return
        event.target.value = ''
        try {
            const form = new FormData()
            form.append('file', file)
            form.append('folder', 'market-reports')
            const res = await fetch('/api/media/upload', { method: 'POST', body: form, credentials: 'include' })
            const body = await res.json().catch(() => ({}))
            if (!res.ok) {
                throw new Error(
                    typeof body.detail === 'string'
                        ? body.detail
                        : body.error || 'Could not upload image'
                )
            }
            const src = typeof body.url === 'string' ? body.url : ''
            if (src) editor.chain().focus().setImage({ src }).run()
        } catch {
            // Keep the editor usable if Cloudinary is not configured yet.
        }
    }

    if (!editor) return null

    const btn = (active: boolean) =>
        `px-2.5 py-1.5 text-[13px] font-medium transition-colors cursor-pointer ${
            active ? 'bg-[#FFFFFF14] text-white' : 'text-[#838388] hover:text-white hover:bg-[#FFFFFF0A]'
        }`

    return (
        <div className="border border-[#FFFFFF0D] overflow-hidden bg-[#16161F]">
            {editable && (
                <div className="flex flex-wrap items-center gap-1 px-2 py-2 border-b border-[#FFFFFF0D] bg-[#FFFFFF08]">
                    <select
                        className="h-8 px-2 text-[13px] border border-[#FFFFFF1A] bg-[#0B0B10] text-white/80 cursor-pointer"
                        defaultValue="16px"
                        onChange={(e) => {
                            editor.chain().focus().setFontSize(e.target.value).run()
                        }}
                        aria-label="Font size"
                    >
                        {FONT_SIZES.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        className={btn(editor.isActive('bold'))}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        aria-label="Bold"
                    >
                        <span className="font-bold">B</span>
                    </button>
                    <button
                        type="button"
                        className={btn(editor.isActive('italic'))}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        aria-label="Italic"
                    >
                        <span className="italic">I</span>
                    </button>
                    <button
                        type="button"
                        className={btn(editor.isActive('underline'))}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        aria-label="Underline"
                    >
                        <span className="underline">U</span>
                    </button>

                    <div className="w-px h-5 bg-[#FFFFFF1A] mx-1" />

                    <button
                        type="button"
                        className={btn(false)}
                        onClick={() => fileInputRef.current?.click()}
                        aria-label="Add image"
                    >
                        Image
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                </div>
            )}

            <div className="px-4 py-4 sm:px-5 sm:py-5">
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

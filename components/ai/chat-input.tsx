
import React, { useRef, useLayoutEffect, useState } from 'react';
import { Paperclip, Square, Send, X, FileText } from 'lucide-react';
import { IAttachment } from '../../types';
import { formatSize } from './utils';

interface ChatInputProps {
    value: string;
    onChange: (val: string) => void;
    onSend: () => void;
    onStop: () => void;
    isTyping: boolean;
    disabled: boolean;
    placeholder?: string;
    mode: 'full' | 'mini' | 'bar' | 'sidebar';
    containerClassName?: string;
    textareaClassName?: string;
    buttonClassName?: string;
    iconSize?: number;
    autoFocus?: boolean;
    images: string[];
    onImagesChange: (images: string[]) => void;
    attachments: IAttachment[];
    onAttachmentsChange: (attachments: IAttachment[]) => void;
    onUploadStatusChange?: (uploading: boolean) => void;
    onImagePreview?: (img: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
    value, onChange, onSend, onStop, isTyping, disabled, placeholder, mode, containerClassName, textareaClassName, buttonClassName, iconSize = 14, autoFocus = false, images = [], onImagesChange, attachments = [], onAttachmentsChange, onUploadStatusChange, onImagePreview
}) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [maxHeight, setMaxHeight] = useState(200);

    const calculateMaxHeight = () => {
         if (typeof window === 'undefined') return 200;
         if (mode === 'mini') return 275; 
         if (mode === 'sidebar') return window.innerHeight * 0.5;
         if (mode === 'full') {
             return window.innerHeight * 0.85 * 0.5;
         }
         return 200;
    };

    useLayoutEffect(() => {
        setMaxHeight(calculateMaxHeight());
        const handleResize = () => setMaxHeight(calculateMaxHeight());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mode]);

    useLayoutEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const scrollHeight = textareaRef.current.scrollHeight;
            const newHeight = Math.min(scrollHeight, maxHeight);
            textareaRef.current.style.height = `${newHeight}px`;
            textareaRef.current.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
        }
    }, [value, maxHeight]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isTyping && !disabled) onSend();
        }
    };

    const processFiles = (files: FileList) => {
        if (onUploadStatusChange) onUploadStatusChange(true);
        const newImages: string[] = [];
        const newAttachments: IAttachment[] = [];
        
        const promises = Array.from(files).map(file => {
            return new Promise<void>((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target?.result as string;
                    if (file.type.startsWith('image/')) {
                        newImages.push(result);
                    } else {
                        newAttachments.push({ id: Date.now() + Math.random().toString(), name: file.name, type: file.type, size: file.size, data: result });
                    }
                    resolve();
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(promises).then(() => {
            if (newImages.length > 0 && onImagesChange) onImagesChange([...images, ...newImages]);
            if (newAttachments.length > 0 && onAttachmentsChange) onAttachmentsChange([...attachments, ...newAttachments]);
            if (onUploadStatusChange) onUploadStatusChange(false);
        }).catch(e => {
            console.error(e);
            if (onUploadStatusChange) onUploadStatusChange(false);
        });
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const items = e.clipboardData.items;
        const files: File[] = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].kind === 'file') {
                const file = items[i].getAsFile();
                if (file) files.push(file);
            }
        }
        if (files.length > 0) {
            e.preventDefault();
            const dt = new DataTransfer();
            files.forEach(f => dt.items.add(f));
            processFiles(dt.files);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) processFiles(e.target.files);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className={`relative bg-white border transition-all flex flex-col ${containerClassName}`}>
            {((images && images.length > 0) || (attachments && attachments.length > 0)) && (
                <div className="p-2 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl flex flex-wrap gap-2 max-h-[150px] overflow-y-auto">
                    {images.map((img: string, idx: number) => (
                        <div key={`img-${idx}`} className="relative group w-16 h-16 rounded-md overflow-hidden border border-gray-200 shadow-sm shrink-0 cursor-zoom-in" onClick={() => onImagePreview && onImagePreview(img)}>
                            <img src={img} alt={`pasted-${idx}`} className="w-full h-full object-cover" />
                            <button onClick={(e) => { e.stopPropagation(); onImagesChange(images.filter((_, i) => i !== idx)); }} className="absolute top-0.5 right-0.5 bg-black/50 hover:bg-black/70 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X size={10} /></button>
                        </div>
                    ))}
                    {attachments.map((att: IAttachment, idx: number) => (
                        <div key={`att-${idx}`} className="relative group flex items-center bg-white border border-gray-200 rounded-md p-2 shadow-sm gap-2 shrink-0 max-w-[200px]" title={att.name}>
                            <div className="w-8 h-8 bg-blue-50 text-blue-500 rounded flex items-center justify-center shrink-0"><FileText size={16} /></div>
                            <div className="flex-1 min-w-0 overflow-hidden">
                                <div className="text-xs font-medium text-gray-700 truncate">{att.name}</div>
                                <div className="text-[10px] text-gray-400">{formatSize(att.size)}</div>
                            </div>
                            <button onClick={() => onAttachmentsChange(attachments.filter((_, i) => i !== idx))} className="text-gray-400 hover:text-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"><X size={12} /></button>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex items-end">
                <button className="p-2 text-gray-400 hover:text-[#927FFF] transition-colors ml-1 mb-1 disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => fileInputRef.current?.click()} disabled={disabled}><Paperclip size={16} /></button>
                <input type="file" ref={fileInputRef} hidden multiple onChange={handleFileSelect} />
                <textarea ref={textareaRef} value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={handleKeyDown} onPaste={handlePaste} placeholder={placeholder} rows={1} autoFocus={autoFocus} className={`flex-1 border-none outline-none focus:ring-0 bg-transparent resize-none block mb-1 ${textareaClassName}`} />
                <div className="mb-1 mr-1">
                    {isTyping ? (
                        <button onClick={onStop} className={`relative flex items-center justify-center transition-colors bg-[#262626] text-white hover:bg-black rounded-full w-8 h-8 ${buttonClassName.replace(/bg-[^\s]+/, '').replace(/hover:bg-[^\s]+/, '')}`}>
                            <div className="absolute inset-0 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                            <Square size={iconSize} fill="currentColor" className="relative z-10" />
                        </button>
                    ) : (
                        <button onClick={onSend} disabled={disabled} className={`flex items-center justify-center transition-colors rounded-full w-8 h-8 disabled:bg-gray-300 disabled:cursor-not-allowed ${buttonClassName}`}><Send size={iconSize} /></button>
                    )}
                </div>
            </div>
        </div>
    );
};

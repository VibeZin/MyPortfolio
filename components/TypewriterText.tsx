import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
    lines: string[];
    /** Base typing speed in ms per character */
    typingSpeed?: number;
    /** Extra pause after completing a line (ms) */
    pauseAfterLine?: number;
    className?: string;
    /** Called once all lines have finished typing */
    onComplete?: () => void;
}

/**
 * Types an array of strings one character at a time.
 * Completed lines stack up above the currently-typing line.
 * A blinking cursor appears at the end while typing is in progress.
 * Naturally slows at commas (+200ms) and periods/exclamation/question (+350ms).
 */
export const TypewriterText: React.FC<TypewriterTextProps> = ({
    lines,
    typingSpeed = 72,
    pauseAfterLine = 750,
    className = '',
    onComplete,
}) => {
    const [doneLines, setDoneLines] = useState<string[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);
    const [finished, setFinished] = useState(false);

    // Cursor blink
    useEffect(() => {
        if (finished) return;
        const id = setInterval(() => setCursorVisible(v => !v), 530);
        return () => clearInterval(id);
    }, [finished]);

    // Typing engine
    useEffect(() => {
        if (currentIdx >= lines.length) {
            setFinished(true);
            onComplete?.();
            return;
        }

        const fullLine = lines[currentIdx];

        if (currentText.length < fullLine.length) {
            // Calculate delay based on the character we just typed
            const prevChar = fullLine[currentText.length - 1];
            let delay = typingSpeed;
            if (prevChar === ',') delay += 200;
            else if (prevChar === '.' || prevChar === '!' || prevChar === '?') delay += 350;

            const id = setTimeout(() => {
                setCurrentText(fullLine.slice(0, currentText.length + 1));
            }, delay);
            return () => clearTimeout(id);
        } else {
            // Line complete — pause then advance
            const id = setTimeout(() => {
                setDoneLines(prev => [...prev, fullLine]);
                setCurrentText('');
                setCurrentIdx(prev => prev + 1);
            }, pauseAfterLine);
            return () => clearTimeout(id);
        }
    }, [currentText, currentIdx, lines, typingSpeed, pauseAfterLine, onComplete]);

    const isTyping = currentIdx < lines.length;

    return (
        <div className={`font-mono ${className}`}>
            {/* Completed lines */}
            {doneLines.map((line, i) => (
                <p key={i} className="mb-1 leading-snug text-[var(--white-90)]">
                    {line}
                </p>
            ))}

            {/* Currently typing line */}
            {isTyping && (
                <p className="mb-1 leading-snug text-[var(--white-90)]">
                    {currentText}
                    <span
                        className="inline-block w-[2px] h-[1em] ml-[2px] align-middle bg-[var(--silver)]"
                        style={{ opacity: cursorVisible ? 1 : 0, transition: 'opacity 0.1s' }}
                    />
                </p>
            )}

            {/* Steady cursor after all lines done */}
            {!isTyping && (
                <span className="cursor-blink inline-block w-[2px] h-[1em] ml-[2px] align-middle bg-[var(--silver)]" />
            )}
        </div>
    );
};

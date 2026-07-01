'use client';

interface CustomCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    id?: string;
}

export default function CustomCheckbox({ checked, onChange, id }: CustomCheckboxProps) {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            id={id}
            onClick={() => onChange(!checked)}
            className="flex-shrink-0 w-[20px] h-[20px] rounded-[5px] border transition-all duration-200 flex items-center justify-center cursor-pointer"
            style={{
                background: checked ? 'rgba(235, 240, 255, 0.95)' : 'rgba(255,255,255,0.06)',
                borderColor: checked ? 'rgba(235, 240, 255, 0.95)' : 'rgba(255,255,255,0.12)',
            }}
        >
            {checked && (
                <svg width="12" height="12" viewBox="0 0 14 11" fill="none">
                    <path
                        d="M1 5L5 9L13 1"
                        stroke="#0D1321"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </button>
    );
}

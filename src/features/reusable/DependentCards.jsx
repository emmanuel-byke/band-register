

export const FloatingFormCard = ({ height = 'min-h-screen', width = 'max-w-md', children }) => (
    <div className={`${height} flex items-center justify-center bg-[var(--color-background)]`}>
        <div className={`bg-[var(--color-neutral)] p-8 rounded-xl shadow-lg ${width} space-y-6`}>
            {children}
        </div>
    </div>
);
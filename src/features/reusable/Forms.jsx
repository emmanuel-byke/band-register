import { FloatingFormCard } from "./DependentCards";
import { HighlightedText } from "./Text";

export const FormContainer = ({ 
  children, 
  highlightedTitle, 
  remainingTitle, 
  height = 'min-h-screen', 
  width = 'max-w-md' 
}) => (
    <FloatingFormCard height={height} width={width}>
        <h2 className="text-3xl font-bold text-center text-[var(--color-primary)]">
            <HighlightedText>{highlightedTitle}</HighlightedText>
            {' '}
            {remainingTitle}
        </h2>
        {children}
    </FloatingFormCard>
);
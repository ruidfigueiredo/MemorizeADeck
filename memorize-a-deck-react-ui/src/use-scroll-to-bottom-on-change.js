import { useEffect } from 'react';

export function useScrollToBottomOnChange(stateProp, containerSelector) {
    useEffect(() => {
        setTimeout(() => {
            const container = document.querySelector(containerSelector);
            if (!container) return;
            container.scrollTop = container.scrollHeight;
        })
    }, [stateProp, containerSelector]);
}
import { useEffect } from 'react';

export function useScrollToBottomOnChange(stateProp, containerSelector) {
    useEffect(() => {
        setTimeout(() => {
            const container = document.querySelector(containerSelector);
            container.scrollTop = container.scrollHeight;
        })
    }, [stateProp, containerSelector]);
}
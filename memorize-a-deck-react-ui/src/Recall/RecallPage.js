import React from 'react';
import { useLocation } from 'react-router-dom';

export function RecallPage() {
    const state = useLocation().state;
    return <div>
        <h1>Recall</h1>
        <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
}
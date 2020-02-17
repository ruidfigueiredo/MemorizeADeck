import React from 'react'
import { Modal } from '../Modal'

export function HintRequestConfirmationModal({ isOpen }) {
    return (<Modal isOpen={isOpen}>
        <h5>Are you sure?</h5>
        <div>If you use hints your score will not be kept</div>
        <button>Cancel</button>
        <button>OK</button>
    </Modal>)
}
import { NgToastService } from 'ng-angular-popup'
import { Toastify } from '../models'

export const showSuccess = (toast: NgToastService, toastMsg: Toastify) => {
    toast.success({
        detail: toastMsg.title,
        summary: toastMsg.description,
        duration: 2000,
        position: 'tr',
        sticky: true,
    })
}
export const showError = (toast: NgToastService, toastMsg: Toastify) => {
    toast.error({
        detail: toastMsg.title,
        summary: toastMsg.description,
        duration: 2000,
        position: 'tr',
        sticky: true,
    })
}
export const showInfo = (toast: NgToastService, toastMsg: Toastify) => {
    toast.info({
        detail: toastMsg.title,
        summary: toastMsg.description,
        duration: 2000,
        position: 'tr',
        sticky: true,
    })
}
export const showWarning = (toast: NgToastService, toastMsg: Toastify) => {
    toast.warning({
        detail: toastMsg.title,
        summary: toastMsg.description,
        duration: 2000,
        position: 'tr',
        sticky: true,
    })
}

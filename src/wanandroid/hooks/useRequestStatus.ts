import type {Ref} from "vue";
import {ref} from "vue";
import {
    VIEW_STATE_EMPTY,
    VIEW_STATE_ERROR,
    VIEW_STATE_LOADING,
    VIEW_STATE_NETWORK_ERROR,
    VIEW_STATE_SUCCESS
} from "../const/ViewStateConstant";
import {ApiResponse} from "../http/http";
import {AxiosError} from "axios";

type LoadStateResult = [
    Ref<string>,
    <T>(requestPromise: Promise<T>, showLoadingState?: boolean) => Promise<T>
]

export function useRequestStatus(viewState: string = VIEW_STATE_LOADING, checkResult?: boolean): LoadStateResult {
    const viewStatus = ref(viewState)

    function run<T>(requestPromise: Promise<T>, showLoadingState?: boolean): Promise<T> {
        if (showLoadingState != false) {
            viewStatus.value = VIEW_STATE_LOADING
        }
        return new Promise<T>((resolve, reject) => {
            requestPromise.then((res) => {
                if (res instanceof Array) {// Promise.all()
                    viewStatus.value = VIEW_STATE_SUCCESS
                } else {
                    if (checkResult) {
                        const result = res as ApiResponse
                        const resultData = result.data
                        console.log(`error----->${result.errorCode}, ${result.errorMsg}`)
                        if (result.errorCode != 0) {
                            viewStatus.value = VIEW_STATE_ERROR
                        } else if (resultData instanceof Array && resultData.length == 0) {
                            viewStatus.value = VIEW_STATE_EMPTY
                        } else {
                            viewStatus.value = VIEW_STATE_SUCCESS
                        }
                    } else {
                        viewStatus.value = VIEW_STATE_SUCCESS
                    }
                    console.log(`viewStatus.value: ${viewStatus.value}`)
                }
                resolve(res)
            }).catch((error) => {
                if (error instanceof AxiosError) {
                    viewStatus.value = VIEW_STATE_NETWORK_ERROR
                } else {
                    viewStatus.value = VIEW_STATE_ERROR
                }
                reject(error)
            })
        })
    }

    return [viewStatus, run]
}



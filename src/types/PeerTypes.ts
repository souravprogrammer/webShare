
type MetaFileData = {
    name: string,
    type: string,
    size: number,
}
interface InitinalData {
    mode: "metaData" | "dataTransfer" | "status" | "complete" | "id" | "cancel"
    list?: MetaFileData[],
    meta?: MetaFileData,
    currentByte?: number,
    data?: ArrayBuffer

}

export type { InitinalData, MetaFileData }
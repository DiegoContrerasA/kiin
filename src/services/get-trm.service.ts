export interface TRMResponse {
    unidad: string
    nombre: string
    valor: number
    fechaActualizacion: string
}

export const getTRM = async (): Promise<number> => {
    try {
        const response = await fetch('https://co.dolarapi.com/v1/trm')
        const data: TRMResponse = await response.json()
        return data.valor
    } catch (error) {
        console.error('Error fetching TRM:', error)
        return 3800
    }
}

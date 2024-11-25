"use client"

import { useEffect, useState } from "react"

// Defina o tipo dos dados retornados pela API
export type Registro = {
  numero_acesso: string
  designacao_material: string
  local_coleta: string
  proprietario: string
  municipio_estado: string
  idade_lavoura: string
  data_coleta: string
  coletor: string
}

// Crie um hook para buscar os dados da API
export const useFetchData = (url: string) => {
  const [data, setData] = useState<Registro[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.statusText}`)
        }
        const jsonData = await response.json()
        setData(jsonData)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

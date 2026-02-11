import type {
  TDocumentBody,
  TDocumentByIdResponse,
  TDocumentResponse,
} from '@/api/types'
import { API_BASE_URL } from '@/api/constants'

export const getDocuments = async (): Promise<TDocumentResponse> => {
  const response = await fetch(`${API_BASE_URL}/documents`)
  return await response.json()
}

export const getDocumentById = async (
  id: number,
): Promise<TDocumentByIdResponse> => {
  const response = await fetch(`${API_BASE_URL}/document/${id}`)
  return await response.json()
}

export const createDocument = async (data: TDocumentBody) => {
  const response = await fetch(`${API_BASE_URL}/documents/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return await response.json()
}

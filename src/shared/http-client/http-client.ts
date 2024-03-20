'use client'

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export class HttpClient {
  private getAPIUrl() {
    return typeof window !== undefined ? window.location.origin : ''
  }

  private async request<R, P = unknown>(path: string, method: HTTPMethod, body?: P): Promise<R> {
    const accessToken = localStorage.getItem('accessToken')

    const response = await fetch(`${this.getAPIUrl()}${path}`, {
      method,
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      next: { tags: [path] },
    })

    if (!response.ok) {
      const errorResponse = await response.json()
      throw errorResponse
    }

    return response.json() as Promise<R>
  }

  public async get<R>(path: string) {
    return this.request<R>(path, 'GET')
  }

  public async post<R, P>(path: string, body: P) {
    return this.request<R, P>(path, 'POST', body)
  }

  public async put<R, P>(path: string, body: P) {
    return this.request<R, P>(path, 'PUT', body)
  }

  public async patch<R, P>(path: string, body: P) {
    return this.request<R, P>(path, 'PATCH', body)
  }

  public async delete<R>(path: string) {
    return this.request<R>(path, 'DELETE')
  }
}

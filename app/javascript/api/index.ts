import 'whatwg-fetch'

export type Options = {
  body?: Object,
  method?: string,
  token?: string
}

const authStr = (token?: string) => token ? `Bearer ${token}` : ''

export const getData = (url: string, { body, method, token }: Options) => {
  const csrfToken = (document.querySelector('meta[name="csrf-token"]') || {}).content

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${authStr(token)}`,
      'Accept': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    method: method || 'GET',
    body: body && JSON.stringify(body)
  }

  return fetch(url, options).then(async (res) => {
    const { ok, status, statusText } = res

    const json = await res.json()
    const response = {
      status: status.toString(),
      statusText,
      ok,
      body: json
    }
    return response
  })
}

import { useState, useEffect } from 'react'
import qs from 'qs'
import { decamelizeKeys } from 'humps'

import type { QueryParam, Query } from 'types'

export const decamelize = (query: Query): Query => decamelizeKeys(query || {}, { split: /(?=[A-Z0-9])/ })


const commaJoinValues = (object: QueryParam) => {
  const result = {}
  Object.keys(object).forEach(key => {
    const value = object[key]
    result[key] = Array.isArray(value) ? value.join(',') : value
  })

  return result
}

export const stringify = (query: Query): string => {
  query = decamelizeKeys(query || {})

  return qs.stringify({
    ...query,
    filter: query.filter && commaJoinValues(query.filter)
  })
}

export const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1)

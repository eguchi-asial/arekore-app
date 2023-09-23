import matter from 'gray-matter'
import { Markdown, Markdowns } from '../types/app'
import { DateTime } from 'luxon'

const useFetchJson = async (url: string, options: RequestInit = {}) => {
  options = {
    ...options,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    }
  }
  let json: Markdowns = undefined
  try {
    const response = await fetch(url, options)
    if (response.status === 200) {
      console.info(`API called: ${url}`)
    } else {
      console.warn(`API failed: ${url}`)
    }
    json = await response.json()
  } catch (err) {
    console.warn(`API failed: ${err}`)
  }
  return json
}

export const getLatestMarkdowns = async (size: number = 10) => {
  try {
    // * 2で幅持たせて、filterで帳尻合わせる
    const requestUrl = `https://tech-arekore.vercel.app/api/articles?cc=${new Date().getTime()}&size=${size * 2}`
    const markdownsJsonObj = await useFetchJson(requestUrl)
    if (!markdownsJsonObj) return []
    const { markdowns = [] } = markdownsJsonObj
    const posts = markdowns.sort((post1, post2) => (post1.id > post2.id ? -1 : 1)).slice(0, size)
    return posts
  } catch(err) {
    // ignore
    console.error(err)
    return []
  }
}

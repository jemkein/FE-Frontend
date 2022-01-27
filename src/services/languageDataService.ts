import http from '@/services/http-common'
import { Item } from '@/types'

class LanguageDataService {
  // create
  create (lang: any): Promise<any> {
    return http.post('/languages/create', lang)
  }

  findById (id: string): Promise<any> {
    return http.post(`/languages/findById/${id}`)
  }

  findByName (name: string): Promise<any> {
    return http.post(`/languages/findById/${name}`)
  }

  // update
  update (lang: any): Promise<any> {
    return http.post(`/languages/update/${lang.id}`, lang)
  }

  /** returns Array of Objects
   *   {
   *      "_id": "61e983e9dca7956d823ca3d1",
   *      "lang": "de",
   *       "required": false,
   *       "__v": 0
   *        },
   * */
  getAll (): Promise<any> {
    return http.get('/languages/getAll')
  }

  // delete
  delete (lang: any): Promise<any> {
    return http.delete(`/languages/delete/${lang.id}`)
  }
}

export default new LanguageDataService()

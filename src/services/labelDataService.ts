import http from '@/services/http-common'
import { Label } from '@/types'

class LabelDataService {
  getAll (): Promise<any> {
    return http.get('/labels/getAll')
  }

  getByItemId (id:string): Promise<any> {
    return http.get('/labels/getByItemId/' + id)
  }

  findByName (name: string): Promise<any> {
    return http.get('/labels/findByName/' + name)
  }

  findById (id:string): Promise<any> {
    return http.get('/labels/findById/' + id)
  }

  findLabelsByItemId (id:string): Promise<any> {
    return http.get('/labels/findByItemId/' + id)
  }

  create (name: any[]):Promise <any> {
    return http.post('/labels/create', name)
  }
}

export default new LabelDataService()

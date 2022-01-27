import http from '@/services/http-common'
import { Item } from '@/types'

class RoomDataService {
  // create Room
  create (payload: any): Promise<any> {
    return http.post('/rooms/create', payload)
  }

  // update Room
  update (Id: any): Promise<any> {
    return http.post(`/rooms/update/${Id}`)
  }

  // get All Rooms
  getAll (): Promise<any> {
    return http.get('/rooms/getAll')
  }

  // delete Room
  delete (Id: any): Promise<any> {
    return http.post(`/rooms/delete/${Id}`)
  }
}

export default new RoomDataService()

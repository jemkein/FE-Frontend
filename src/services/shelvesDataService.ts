import http from '@/services/http-common'

class ShelvesDataService {
  // create a shelf by name
  create (Name: any): Promise<any> {
    return http.post(`/shelves/create/${Name}`)
  }

  // updates the shelf
  update (Id: any): Promise<any> {
    return http.post(`/shelves/update/${Id}`)
  }

  // get All shelves
  getAll (): Promise<any> {
    return http.get('/shelves/getAll')
  }

  // delete a shelf with Id
  delete (Id: any): Promise<any> {
    return http.post(`/shelves/delete/${Id}`)
  }
}

export default new ShelvesDataService()

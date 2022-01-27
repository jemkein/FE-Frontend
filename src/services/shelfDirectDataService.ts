import http from '@/services/http-embedded'

class ShelfDirectDataService {
  /** receive all unused MacAdresses (Shelves) from Backend */
  getMacAdresses (): Promise<any> {
    return http.get('/light/getMACAddresses')
  }

  /** set LEDs for specific Shelf via Attributes with Color inHexFormat */
  setLEDsWAttributes (MacAdress:string, LEDs:number[], HexColor:string): Promise<any> {
    const payload = {
      Mac_Address: MacAdress,
      LEDs: LEDs,
      Color: HexColor
    }
    return http.post('/light/setLEDs', payload)
  }

  /** set LEDs for specific Shelf via Object of Format
    *  const payload = {
          Mac_Address: MacAdress,
          LEDs: LEDs,
          Color: Color
    } */
  setLEDsWObject (payload:any): Promise<any> {
    return http.post('/light/setLEDs', payload)
  }

  /** set LEDs for specific Shelf via Object of Format
   *  const payload = {
          Mac_Address: MacAdress,
          LEDs: LEDs
    } */
  unstLEDsWObject (payload:any): Promise<any> {
    return http.post('/light/unsetLEDs', payload)
  }

  /** set Position on ESP for specific Shelf via Object of Format
   *    ShelfPosition{
          "ShelfNumber": int,
          "PositionId": int,
          "LEDs": [int]
    } */
  createPosition (ShelfPosition:any): Promise<any> {
    return http.post('/light/findById/', ShelfPosition)
  }

  /** delete Position for specific Shelf via Object of Format
   *    ShelfPosition{
          "ShelfNumber": int,
          "PositionId": int
    } */
  deletePosition (ShelfPosition:any): Promise<any> {
    return http.post('/light/getPositions', ShelfPosition)
  }

  /** delete Position for specific Shelf via Object of Format
  *   Shelf{
        "ShelfNumber": int,
        "Mac_Address": str,
        "Positions": List[ShelfPosition] = []
  } */
  createShelf (payload:any): Promise<any> {
    return http.post('/light/createShelf', payload)
  }
}

export default new ShelfDirectDataService()

import http from '@/services/http-common'

class LightDataService {
  /** TurnsOff Position According to ItemID */
  turnOff (itemId:string): Promise<any> {
    console.log(itemId)
    return http.post('/light/turnOff', { itemId })
  }

  /** TurnsOn light on Position from Item via lightObject
   *
   * @param lightObject -{
        itemId: itemID,
        color: color,
        duration: duration
      }
   */
  turnOnObject (lightObject: any): Promise<any> {
    return http.post('/light/turnOn', lightObject)
  }

  /**
   *TurnsOn light on Position from Item via Attributes
   * @param itemID  {string}  - itemID
   * @param color {string}  - color as Hex
   * @param duration {number} - (Optional) in seconds
   */
  turnOnAttributes (itemID: string, color:string, duration?:number): Promise<any> {
    let payload
    if (duration) {
      payload = {
        itemId: itemID,
        color: color,
        duration: duration
      }
    } else {
      payload = {
        itemId: itemID,
        color: color
      }
    }
    return http.post('/light/turnOn', payload)
  }
}

export default new LightDataService()

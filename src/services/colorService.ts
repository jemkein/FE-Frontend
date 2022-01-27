// TODO: Not used anymore
class ColorService {
  primary = '#80ba24'
  secondary = '#4a5c66'
  accent = '#8c9eff'
  error = '#b71c1c'

  defaultPrimary = '#80ba24'
  defaultSecondary = '#4a5c66'
  defaultAccent = '#8c9eff'
  defaultError = '#b71c1c'

  getColorHexPrimary (): string {
    return this.primary
  }

  setColorHexPrimary (color:string) {
    this.primary = color
  }

  getColorHexSecondary (): string {
    return this.secondary
  }

  setColorHexSecondary (color:string) {
    this.secondary = color
  }

  getColorHexAccent (): string {
    return this.accent
  }

  setColorHexAccent (color:string) {
    this.accent = color
  }

  getColorHexError (): string {
    return this.error
  }

  setColorHexError (color:string) {
    this.error = color
  }

  setDefault () {
    this.primary = this.defaultPrimary
    this.secondary = this.defaultSecondary
    this.accent = this.defaultAccent
    this.error = this.defaultError
  }
}
export default new ColorService()

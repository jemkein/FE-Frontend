
// Setting up Tag with tagname and Optional(?) tagcolour
import * as mongoose from 'mongoose'

export interface Label {
  name: string,
  colour?: string,
  _id?: mongoose.Types.ObjectId
}

// Setting up Item for easier use in any component
export interface Item {
  _id?: mongoose.Types.ObjectId,

  name: any,
  description: {en :string,
    de :string },
  bild?: string,
  quantity?: number,
  countable: boolean,
  position?: string,
  available?: boolean,
  labelsIds: mongoose.Types.ObjectId[]
}

export interface Items {
  [key:string]: Item
}

export interface User {
  username: string,
  email?: string,
  password: string
}

export interface Room{
  name: {en:string
    de:string},
  ipAddress: string
}

export interface Position {
  shelfNumber: number,
  positionId: number,
  LEDs: number[],
}

export interface Mac{
  mac: string
}
// todo type shelf

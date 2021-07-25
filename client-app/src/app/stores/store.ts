import { createContext, useContext } from "react"
import CommonStore from "./commonStore"
import ReservationStore from "./reservationStore"

interface Store {
    reservationStore: ReservationStore;
    commonStore: CommonStore;
}

export const store: Store = {
    reservationStore: new ReservationStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store)

export function useStore(){
    return useContext(StoreContext)
}


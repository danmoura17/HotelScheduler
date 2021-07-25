import { createContext, useContext } from "react"
import CommonStore from "./commonStore"
import ModalStore from "./modalStore"
import ReservationStore from "./reservationStore"
import UserStore from "./userStore"

interface Store {
    reservationStore: ReservationStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    reservationStore: new ReservationStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store)

export function useStore(){
    return useContext(StoreContext)
}


import {create} from 'zustand';

export const useFront = create((set) => ({
    floor: true,
    setFloor: () => set((state) => ({floor: !state.floor})),
    selectedroom: null,
    setSelectedRoom: (room) => set((state) => ({selectedroom: room})),
    booking: null,
    setbookings: (bookings) => set((state) => ({booking: bookings}))
}))
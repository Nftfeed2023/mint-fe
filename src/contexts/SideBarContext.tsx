import { createContext, useCallback, useContext, useState } from 'react'

const SideBarContext = createContext({
  isOpen: true,
  onOpen: () => {},
  onClose: () => {},
})

const SideBarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)

  const onOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <SideBarContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </SideBarContext.Provider>
  )
}

export const useSidebar = () => {
  const { isOpen, onClose, onOpen } = useContext(SideBarContext)

  return {
    isOpen,
    onClose,
    onOpen,
  }
}

export default SideBarProvider

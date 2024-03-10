import {
  createContext,
  useState,
  FC,
  ReactNode,
  isValidElement,
  cloneElement,
  Dispatch,
  SetStateAction,
} from 'react'

interface ModalsContext {
  onPresent: (node: ReactNode, key?: string) => void
  onDismiss: () => void
  setCloseOnOverlayClick: Dispatch<SetStateAction<boolean>>
  isOpen?: any
  nodeId?: any
  modalNode?: any
  setModalNode?: any
}

export const Context = createContext<ModalsContext>({
  onPresent: () => null,
  onDismiss: () => null,
  setCloseOnOverlayClick: () => true,
})

const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalNode, setModalNode] = useState<ReactNode>()
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true)

  const handlePresent = (node: ReactNode) => {
    setModalNode(node)
    setIsOpen(true)
  }

  const handleDismiss = () => {
    setModalNode(undefined)
    setIsOpen(false)
  }

  const handleOverlayDismiss = () => {
    if (closeOnOverlayClick) {
      handleDismiss()
    }
  }

  return (
    <Context.Provider
      value={{
        onPresent: handlePresent,
        onDismiss: handleDismiss,
        setCloseOnOverlayClick,
      }}
    >
      {isOpen &&
        isValidElement(modalNode) &&
        cloneElement(modalNode, {
          //@ts-ignore
          onDismiss: handleDismiss,
          isOpen,
        })}
      {children}
    </Context.Provider>
  )
}

export default ModalProvider

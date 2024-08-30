import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    createContext,
    useContext,
    useRef,
    useState
} from 'react'

interface NavContext {
    inView: Record<string, boolean>
    setInView: Dispatch<SetStateAction<Record<string, boolean>>>
    rootRef: MutableRefObject<HTMLDivElement>
}

export const InViewContext = createContext({} as NavContext)

export function InViewProvider({
    children,
    targetIds = []
}: {
    children: React.ReactNode
    targetIds: Array<string>
}) {
    const rootRef = useRef<HTMLDivElement>(null)

    const [inView, setInView] = useState<Record<string, boolean>>(
        Object.fromEntries(
            targetIds.map((id, index) => [id, index > 0 ? false : true])
        )
    )

    return (
        <InViewContext.Provider value={{ inView, setInView, rootRef }}>
            {children}
        </InViewContext.Provider>
    )
}

export function useInViewPrivate() {
    return useContext(InViewContext)
}

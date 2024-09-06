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
    targetIds = [],
    firstTargetActiveOnMount = true
}: {
    children: React.ReactNode

    /** An array of strings that specifies the IDs of the Target components to be tracked. */
    targetIds: Array<string>

    /** By default, the first target is activated when the component mounts. If set to `false`,
     *  it will only update once the user starts scrolling and the target enters the viewport. */
    firstTargetActiveOnMount?: boolean
}) {
    const rootRef = useRef<HTMLDivElement>(null)

    const [inView, setInView] = useState<Record<string, boolean>>(
        Object.fromEntries(
            targetIds.map((id, index) => [
                id,
                index > 0 ? false : firstTargetActiveOnMount
            ])
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

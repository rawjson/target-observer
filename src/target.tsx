import { ElementType, HTMLAttributes, useEffect, useRef } from 'react'
import { useInViewPrivate } from './in-view-provider'

type EntryThresholdRange =
    | 0.1
    | 0.2
    | 0.3
    | 0.4
    | 0.5 // default
    | 0.6
    | 0.7
    | 0.8
    | 0.9

export function Target({
    id,
    children,
    as: Component = 'div',
    entryThreshold = 0.5,
    ...props
}: HTMLAttributes<HTMLElement> &
    Partial<{
        as: ElementType

        /**
         * The percentage of observing zone height that should be used to trigger the observer.
         * The target element when inside this area will update the `inView` property to true.
         *
         * accepts value between `0` and `1`. Min is `0.1` and Max is `0.9`.
         *
         * default value is `0.5` // 50% percent
         */
        entryThreshold: EntryThresholdRange
    }>) {
    const { rootRef, setInView } = useInViewPrivate()
    const ref = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const d = document

        const rootBounds = rootRef.current.getBoundingClientRect()
        const rootBottom = rootBounds.bottom

        function checkIfInsideViewport() {
            const elementBounds = ref.current.getBoundingClientRect()
            const elementTop = elementBounds.top
            const rootHeightToObserve = rootBottom * entryThreshold

            if (elementTop < rootHeightToObserve) {
                setInView((p) => {
                    Object.keys(p).forEach((v) => (p[v] = false))

                    return { ...p, [id]: true }
                })
            }
        }

        d.addEventListener('scroll', checkIfInsideViewport)

        return () => {
            d.removeEventListener('scroll', checkIfInsideViewport)
        }
    }, [])

    return (
        <Component id={id} ref={ref} {...props}>
            {children}
        </Component>
    )
}

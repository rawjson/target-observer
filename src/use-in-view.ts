import { useInViewPrivate } from './in-view-provider'

export function useInView() {
    const { inView } = useInViewPrivate()
    return inView
}

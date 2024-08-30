import { CSSProperties } from 'react'
import { useInViewPrivate } from './in-view-provider'

/* invisible component being used as the root reference*/
export function ObserveZone({
    height = '50vh',
    ...rest
}: Partial<{
    height: CSSProperties['height']
    className: HTMLDivElement['className']
}>) {
    const { rootRef } = useInViewPrivate()

    return (
        <div
            style={{
                position: 'absolute',
                inset: '0px',
                pointerEvents: 'none',
                width: '100%',
                height: '100%'
            }}
        >
            <div
                {...rest}
                ref={rootRef}
                style={{
                    position: 'sticky',
                    top: '2.5rem',
                    width: '100%',
                    height
                }}
            />
        </div>
    )
}

The useInView hook tracks when a target element enters the viewport, making it ideal for dynamically updating the styling of items or chapters in a table of contents on a documentation site.

Example:

```ts
import {
    useInView,
    InViewProvider,
    ObserveZone,
    Target
} from '@rawjson/use-in-view'
import clsx from 'clsx'

const targetIds = [
    'section#1',
    'section#2',
    'section#3',
    'section#4',
    'section#5'
]
export default function Example() {
    return (
        <InViewProvider targetIds={targetIds}>
            <div className='h-screen w-full'>
                <div className='max-w-7xl mx-auto w-full p-5 flex gap-10'>
                    <Navigation />
                    {/* must use position:relative in parent for ObserveZone to work */}
                    <div className='relative w-full space-y-5'>
                        {/* add this invisible component to track the target */}
                        <ObserveZone
                            // optional height property, default is 50vh
                            height='70vh'
                            // optional className property, use only for testing
                            className='ring-4 ring-offset-8 ring-red-500/20'
                        />

                        {targetIds.map((targetId) => (
                            <Target
                                key={targetId}
                                // must specify the id property for target to work
                                id={targetId}
                                // the html element you want to render
                                as='section'
                                // add styling to your target
                                className='h-[90vh] border-4 p-5 w-full'
                                // the height in percent of observing zone to trigger inView state
                                // default is 0.5 (50 percent)
                                entryThreshold={0.3}
                            >
                                Target: {targetId}
                            </Target>
                        ))}
                    </div>
                </div>
            </div>
        </InViewProvider>
    )
}

function Navigation() {
    const inView = useInView() // returns a record with boolean values
    return (
        <div className='sticky top-10 h-screen'>
            <ul className='space-y-4'>
                {targetIds.map((targetId) => (
                    <li
                        key={targetId}
                        className={clsx('text-center w-32', {
                            'font-bold py-1 bg-red-500 text-white':
                                inView[targetId]
                        })}
                    >
                        <a href={'#' + targetId}>{targetId}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
```

export const stopEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
}

const wheelSpeed = 3;
export const scrollHorizontally = (e: any, scrollRef: React.RefObject<HTMLElement>) => {
  e.preventDefault();
  if (scrollRef && scrollRef.current) {
    const container = scrollRef.current
    const containerScrollPosition = scrollRef.current.scrollLeft

    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY * wheelSpeed,
    })
  }
}
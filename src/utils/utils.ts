export const stopEventPropagation = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
}

const wheelSpeed = 3;
export const scrollHorizontally = (e: any, scrollRef: React.RefObject<HTMLElement>) => {
  if (scrollRef && scrollRef.current) {
    const container = scrollRef.current
    const containerScrollPosition = scrollRef.current.scrollLeft

    container.scrollTo({
      top: 0,
      left: containerScrollPosition + e.deltaY * wheelSpeed,
    })
  }
}

export const roundTenth = (value: number) => Math.round(value * 10)/10
export const roundHundredth = (value: number) => Math.round(value * 100)/100

export const addNumber = (number1: number, number2: number, precision = 2): number => {
  const precisionValue = Math.pow(10, precision)
  return (number1 * precisionValue + number2 * precisionValue) / precisionValue
}

export const multiplyNumber = (number1: number, number2: number, precision = 3): number => {
  const precisionValue = Math.pow(10, precision)
  return ((number1 * precisionValue) * (number2 * precisionValue)) / (precisionValue * precisionValue)
}

export const addElementIfNotInArray = (array: unknown[], element: unknown, checkIsIdentical?: (e1: unknown, e2: unknown) => boolean) => {
  checkIsIdentical = checkIsIdentical || ((e1, e2) => e1 === e2)
  if (array.some(e => checkIsIdentical!(e, element))) {
    return;
  }
  array.push(element)
}
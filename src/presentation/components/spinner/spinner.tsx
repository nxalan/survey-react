import React from 'react'
import Styles from './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
}

const Spinner: React.FC<Props> = (props: Props & {className: string}) => {
  const negativeClass = props.isNegative ? Styles.negative : ''
  return (
    <div {...props} data-testid="spinner" className={[Styles.spinner, negativeClass, props.className].join(' ')}>
      <div /><div /><div /><div />
    </div>
  )
}

export default Spinner

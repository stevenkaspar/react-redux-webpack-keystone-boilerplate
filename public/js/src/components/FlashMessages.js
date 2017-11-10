import * as React from 'react'
import PropTypes from 'prop-types'

export default class FlashMessages extends React.Component {
  constructor(){
    super()

    this.state = {
      messages: window.flash_messages || []
    }
  }

  render(){
    const class_name = this.state.messages.length > 0 ? 'mb-1 bg-light text-muted p-1' : ''
    return (
      <div className={class_name}>
        {
          this.state.messages.map((m, i) => {
            return (
              <div key={i}>{m.title}</div>
            )
          })
        }
      </div>
    )
  }
}


FlashMessages.propTypes = {}

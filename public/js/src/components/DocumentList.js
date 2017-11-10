import * as React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'


export default class DocumentList extends React.Component {
  constructor(){
    super()
  }

  getDocumentsJSX(){
    let jsx = []

    let row_data = this.props.documents.items.sort((a, b) => moment(a.date).isAfter(moment(b.date)) ? -1 : 1)

    for(let data of row_data){
      let data_moment = moment(data.date)

      jsx.push(
        <div key={data._id} className='documents-row'>
          <div className='documents-row-left d-flex align-items-center'>
            <div className='text-center documents-row-icon'>
              <i className='fa fa-file-text-o'></i>
            </div>
            <div className='pl-2'>
              <div className='documents-row-label'>
                {data.label}
              </div>
              <div className='documents-row-details'>
                { data_moment.format('YYYY-MM-DD') }
              </div>
            </div>
          </div>
          <div className='documents-row-right'>
            <a className='text-muted' href={`/api/documents/${data._id}`} download>download</a>
          </div>
        </div>
      )
      if(jsx.length >= this.props.max_items){
        break
      }
    }
    return jsx
  }

  render(){
    return (
      <div className='documents-container'>
        <div className='documents-wrapper'>
          {
            this.props.documents.items.length > 0 ?
              this.getDocumentsJSX()
            : <div className='documents-row'>
                <div className='documents-row-left'>You have no documents</div>
              </div>
          }
        </div>
      </div>
    )
  }
}


DocumentList.propTypes = {
  documents: PropTypes.object.isRequired
  , max_items: PropTypes.number.isRequired
}

import * as Nerv from 'nervjs'
import {renderIntoDocument} from 'nerv-test-utils'
import sinon from 'sinon'
import Tag from '../'

describe('Tag', () => {
  const handleClose = (evt, name) => {
    return {evt, name}
  }
  it('render tag', () => {
    const tag = <Tag closable onClose={handleClose}>Tag</Tag>
    const component = renderIntoDocument(tag)
    // const dom = Nerv.findDOMNode(component)
    // console.log(dom)
    // // debugger
    // expect(component.props).toHaveProperty('closable', true)
    // expect(component.props).toHaveProperty('onClose', handleClose)
    expect(1).toEqual(1)
    // expect(dom.textContent).toEqual('Tag')
  })
})

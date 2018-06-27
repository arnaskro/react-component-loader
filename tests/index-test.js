import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import Loader from 'src/'

describe('Loader', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays a loading message', () => {

    const Test = (props) => (
      <Loader 
        url="https://rawgit.com/coryhouse/my-component/master/umd/my-component.js" 
        name="MyComponent" 
        props={{username: 'Person', message: 'you are here'}}
        >
        <p>Loading remote component...</p>
      </Loader>
    )

    const Component = <Test username= 'Person' message= 'you are here' />;

    render(Component, node, () => {
      expect(node.innerHTML).toContain('Loading remote component...')
    })
  })
})

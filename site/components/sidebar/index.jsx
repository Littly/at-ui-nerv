import * as Nerv from 'nervjs'
import { NavLink } from 'react-router-dom'
import CollapseTransition from '@src/animations/collapse-transition'
import classnames from 'classnames'

// interface Item {
//   title: string
//   name: string
//   items: NavItem[]
//   groups: any[]
// }

// interface NavItem {
//   name: string
//   title: string
// }
import './style.scss'

class Sidebar extends Nerv.Component {
  constructor (...args) {
    super(...args)
    this.state = {
      currentOpenMenu: []
    }
  }
  componentDidMount () {}
  toggleMenu (idx) {
    this.setState(function (state) {
      let { currentOpenMenu } = state
      if (currentOpenMenu.includes(idx)) {
        currentOpenMenu.splice(currentOpenMenu.indexOf(idx), 1)
      } else {
        currentOpenMenu.push(idx)
      }

      return {
        currentOpenMenu
      }
    })
  }
  render () {
    const { data: items } = this.props
    return (
      <nav className='at-nav'>
        {items.map((item) => {
          return (
            <div key={item.name}>
              <h2 class='at-nav__title'>{item.title}</h2>
              <ul class='at-nav__items'>
                {item.items &&
                  item.items.map((navItem) => {
                    return (
                      <li className='at-nav__item' key={navItem.name}>
                        <NavLink
                          exact
                          className='at-nav__page'
                          activeClassName='router-link-exact-active router-link-active'
                          to={{
                            pathname: `/docs/${navItem.name.toLowerCase()}`
                          }}
                          replace
                        >
                          {navItem.title}
                        </NavLink>
                      </li>
                    )
                  })}
                {item.groups &&
                  item.groups.map((group, idx) => {
                    return (
                      <li className='at-nav__item active' key={group.title}>
                        <a
                          className='at-nav__group'
                          onClick={this.toggleMenu.bind(this, idx)}
                        >
                          {group.title}
                          <i
                            className={classnames('icon', {
                              'icon-chevron-down': this.state.currentOpenMenu.includes(
                                idx
                              ),
                              'icon-chevron-up': !this.state.currentOpenMenu.includes(
                                idx
                              )
                            })}
                          />
                        </a>
                        <CollapseTransition
                          isShow={this.state.currentOpenMenu.includes(idx)}
                        >
                          <ul className='at-nav__child-items'>
                            {' '}
                            {group.items.map((navItem) => {
                              return (
                                <li
                                  className='at-nav__child-item'
                                  key={navItem.name}
                                >
                                  <NavLink
                                    className='at-nav__component'
                                    activeClassName='router-link-exact-active router-link-active'
                                    to={`/docs/${navItem.name.toLowerCase()}`}
                                    replace
                                  >
                                    {navItem.name}
                                    <span>{navItem.title}</span>
                                  </NavLink>
                                </li>
                              )
                            })}
                          </ul>
                        </CollapseTransition>
                      </li>
                    )
                  })}
              </ul>
            </div>
          )
        })}
      </nav>
    )
  }
}

export default Sidebar

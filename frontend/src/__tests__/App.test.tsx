import { afterEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

afterEach(() => {
  window.history.replaceState({}, '', '/')
})

describe('App routing', () => {
  it('renders the citizen management page at /ciudadanos', () => {
    window.history.pushState({}, '', '/ciudadanos')

    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /gestion de ciudadanos con busqueda, edicion y validacion local/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders the login page at /login', () => {
    window.history.pushState({}, '', '/login')

    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /acceso seguro al panel operativo de la junta auxiliar/i,
      }),
    ).toBeInTheDocument()
  })
})

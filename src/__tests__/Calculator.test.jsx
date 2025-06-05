import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from '../Calculator'
import '@testing-library/jest-dom'

describe('Calculator Additional Functional Tests (Selectors Fixed)', () => {
  it('should perform subtraction and show 5 − 8 = -3 as ERROR', async () => {
    render(<Calculator />)
    const user = userEvent.setup()

    // Clic en el botón “5”
    await user.click(screen.getByRole('button', { name: '5' }))
    // Clic en el botón “−”
    await user.click(screen.getByRole('button', { name: '−' }))
    // Clic en el botón “8”
    await user.click(screen.getByRole('button', { name: '8' }))
    // Clic en el botón “=”
    await user.click(screen.getByRole('button', { name: '=' }))

    // Debería mostrar “ERROR” (porque 5 − 8 = -3)
    expect(screen.getByTestId('display')).toHaveTextContent('ERROR')
  })

  it('should perform multiplication and show 7 × 8 = 56', async () => {
    render(<Calculator />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: '7' }))
    await user.click(screen.getByRole('button', { name: '×' }))
    await user.click(screen.getByRole('button', { name: '8' }))
    await user.click(screen.getByRole('button', { name: '=' }))

    expect(screen.getByTestId('display')).toHaveTextContent('56')
  })

  it('should perform division 8 ÷ 2 = 4', async () => {
    render(<Calculator />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: '8' }))
    await user.click(screen.getByRole('button', { name: '÷' }))
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: '=' }))

    expect(screen.getByTestId('display')).toHaveTextContent('4')
  })

  it('should show ERROR on division by zero: 7 ÷ 0', async () => {
    render(<Calculator />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: '7' }))
    await user.click(screen.getByRole('button', { name: '÷' }))
    await user.click(screen.getByRole('button', { name: '0' }))
    await user.click(screen.getByRole('button', { name: '=' }))

    expect(screen.getByTestId('display')).toHaveTextContent('ERROR')
  })

  it('should ignore any digit beyond 9 characters', async () => {
    render(<Calculator />)
    const user = userEvent.setup()

    // Queremos ingresar “1234567890” pero sólo debería quedarse “123456789”
    const sequence = ['1','2','3','4','5','6','7','8','9','0']
    for (const digit of sequence) {
      await user.click(screen.getByRole('button', { name: digit }))
    }
    expect(screen.getByTestId('display')).toHaveTextContent('123456789')
  })

  it('should show ERROR if result exceeds 999,999,999 (overflow)', async () => {
    render(<Calculator />)
    const user = userEvent.setup()

    // Ingresar “999999999 + 1”
    for (let i = 0; i < 9; i++) {
      await user.click(screen.getByRole('button', { name: '9' }))
    }
    await user.click(screen.getByRole('button', { name: '+' }))
    await user.click(screen.getByRole('button', { name: '1' }))
    await user.click(screen.getByRole('button', { name: '=' }))

    expect(screen.getByTestId('display')).toHaveTextContent('ERROR')
  })

  it('should chain equals: 4 + 2 = 6 (no repeating by default)', async () => {
    render(<Calculator />)
    const user = userEvent.setup()

    // 4 + 2 = 6
    await user.click(screen.getByRole('button', { name: '4' }))
    await user.click(screen.getByRole('button', { name: '+' }))
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: '=' }))
    expect(screen.getByTestId('display')).toHaveTextContent('6')

    // Si pulsamos = de nuevo, asumimos que la lógica no repite la última operación,
    // por lo que el resultado se mantiene “6” (en lugar de 8). Ajusta esta expectativa
    // si tu calculadora SÍ implementa “press = to repeat last operation”.
    await user.click(screen.getByRole('button', { name: '=' }))
    expect(screen.getByTestId('display')).toHaveTextContent('6')
  })

  it('should handle a long decimal result: 22 ÷ 7 truncated to max 9 chars', async () => {
    render(<Calculator />)
    const user = userEvent.setup()

    // 22 ÷ 7 =
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: '2' }))
    await user.click(screen.getByRole('button', { name: '÷' }))
    await user.click(screen.getByRole('button', { name: '7' }))
    await user.click(screen.getByRole('button', { name: '=' }))

    const displayed = screen.getByTestId('display').textContent
    // Debe ser ≤ 9 caracteres y empezar por “3.142857” (aprox.)
    expect(displayed.length).toBeLessThanOrEqual(9)
    expect(displayed.startsWith('3.142857')).toBe(true)
  })

  it('should not allow leading zeros: entering 0005 should show 5', async () => {
    render(<Calculator />)
    const user = userEvent.setup()

    // Ingresar “0005”
    await user.click(screen.getByRole('button', { name: '0' }))
    await user.click(screen.getByRole('button', { name: '0' }))
    await user.click(screen.getByRole('button', { name: '0' }))
    await user.click(screen.getByRole('button', { name: '5' }))

    expect(screen.getByTestId('display')).toHaveTextContent('5')
  })

  it('should treat toggle on 0 as 0 (no "-0")', async () => {
    render(<Calculator />)
    const user = userEvent.setup()

    // Si presionamos “0” y luego “+/-”, el display sigue en “0”
    await user.click(screen.getByRole('button', { name: '0' }))
    await user.click(screen.getByRole('button', { name: '+/-' }))
    expect(screen.getByTestId('display')).toHaveTextContent('0')

    // Y si volvemos a pulsar “+/-”, sigue en “0”
    await user.click(screen.getByRole('button', { name: '+/-' }))
    expect(screen.getByTestId('display')).toHaveTextContent('0')
  })
})

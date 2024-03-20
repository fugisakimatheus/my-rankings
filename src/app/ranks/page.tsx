'use client'

import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import themes from 'daisyui/src/theming/themes'
import { themeChange } from 'theme-change'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Ranks() {
  const themesNames = Object.keys(themes)

  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <main className="p-10 flex flex-col gap-6">
      <Input placeholder="Informe o nome" leftIcon={<Icon name="FiUser" />} colorScheme="primary" />
      <Select data-choose-theme colorScheme="primary" className="capitalize">
        <option value="">Default</option>
        {themesNames.map(themeName => (
          <option key={themeName} value={themeName} className="capitalize">
            {themeName}
          </option>
        ))}
      </Select>

      <Button>Enviar email</Button>
    </main>
  )
}
